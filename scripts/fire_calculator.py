import dash
from dash import dcc, html
from dash.dependencies import Input, Output, State
import plotly.graph_objects as go
import plotly.express as px
import pandas as pd
import numpy as np
import numpy_financial as npf
from datetime import datetime

# Initialize the Dash app
app = dash.Dash(__name__)

# Define the layout
app.layout = html.Div([
    html.H1("FIRE Calculator", style={'textAlign': 'center'}),
    
    # Input Section
    html.Div([
        html.Div([
            html.Label('Current Age'),
            dcc.Input(id='current-age', type='number', value=30),
            
            html.Label('Target Retirement Age'),
            dcc.Input(id='retirement-age', type='number', value=45),
            
            html.Label('Current Savings ($)'),
            dcc.Input(id='current-savings', type='number', value=100000),
            
            html.Label('Monthly Savings ($)'),
            dcc.Input(id='monthly-savings', type='number', value=2000),
        ], style={'width': '48%', 'display': 'inline-block'}),
        
        html.Div([
            html.Label('Expected Annual Return (%)'),
            dcc.Input(id='return-rate', type='number', value=7),
            
            html.Label('Expected Inflation (%)'),
            dcc.Input(id='inflation-rate', type='number', value=2),
            
            html.Label('Current Annual Expenses ($)'),
            dcc.Input(id='current-expenses', type='number', value=50000),
            
            html.Label('Expected Retirement Expenses ($)'),
            dcc.Input(id='retirement-expenses', type='number', value=40000),
        ], style={'width': '48%', 'display': 'inline-block', 'float': 'right'}),
    ], style={'padding': '20px'}),
    
    # Calculate Button
    html.Div([
        html.Button('Calculate FIRE Plan', id='calculate-button', 
                   style={
                       'backgroundColor': '#0066cc',
                       'color': 'white',
                       'padding': '10px 20px',
                       'border': 'none',
                       'borderRadius': '4px',
                       'cursor': 'pointer',
                       'fontSize': '16px',
                       'margin': '20px auto',
                       'display': 'block'
                   })
    ], style={'textAlign': 'center'}),
    
    # Results Section
    html.Div([
        html.H3("Results"),
        html.Div(id='time-to-fire'),
        html.Div(id='target-amount'),
        html.Div(id='monthly-savings-needed'),
    ], style={'padding': '20px'}),
    
    # Graphs
    dcc.Graph(id='savings-projection'),
    dcc.Graph(id='return-rate-impact'),
])

# Callback for calculations and graphs
@app.callback(
    [Output('time-to-fire', 'children'),
     Output('target-amount', 'children'),
     Output('monthly-savings-needed', 'children'),
     Output('savings-projection', 'figure'),
     Output('return-rate-impact', 'figure')],
    [Input('calculate-button', 'n_clicks')],
    [State('current-age', 'value'),
     State('retirement-age', 'value'),
     State('current-savings', 'value'),
     State('monthly-savings', 'value'),
     State('return-rate', 'value'),
     State('inflation-rate', 'value'),
     State('current-expenses', 'value'),
     State('retirement-expenses', 'value')]
)
def update_calculations(n_clicks, current_age, retirement_age, current_savings, monthly_savings, 
                       return_rate, inflation_rate, current_expenses, retirement_expenses):
    if n_clicks is None:
        return ["", "", "", go.Figure(), go.Figure()]
        
    # Calculate real return rate
    real_return_rate = (1 + return_rate/100) / (1 + inflation_rate/100) - 1
    
    # Calculate target amount using 4% rule
    target_amount = retirement_expenses * 25
    
    # Calculate time to FIRE
    years_to_fire = npf.nper(real_return_rate/12, -monthly_savings, -current_savings, target_amount) / 12
    
    # Calculate required monthly savings to reach target by retirement age
    years_available = retirement_age - current_age
    required_monthly_savings = npf.pmt(real_return_rate/12, years_available*12, -current_savings, target_amount)
    
    # Create savings projection
    years = np.arange(current_age, current_age + years_available + 1)
    savings = [current_savings]
    for year in range(1, len(years)):
        savings.append(savings[-1] * (1 + real_return_rate) + monthly_savings * 12)
    
    fig1 = go.Figure()
    fig1.add_trace(go.Scatter(x=years, y=savings, mode='lines', name='Projected Savings'))
    fig1.add_hline(y=target_amount, line_dash="dash", line_color="red", 
                  annotation_text="FIRE Target", annotation_position="bottom right")
    fig1.update_layout(title='Savings Projection', xaxis_title='Age', yaxis_title='Savings ($)')
    
    # Create return rate impact analysis
    return_rates = np.linspace(return_rate - 2, return_rate + 2, 5)
    years_to_fire_rates = []
    for rate in return_rates:
        real_rate = (1 + rate/100) / (1 + inflation_rate/100) - 1
        years = npf.nper(real_rate/12, -monthly_savings, -current_savings, target_amount) / 12
        years_to_fire_rates.append(years)
    
    fig2 = go.Figure()
    fig2.add_trace(go.Bar(x=return_rates, y=years_to_fire_rates))
    fig2.update_layout(title='Impact of Return Rate on Time to FIRE',
                      xaxis_title='Return Rate (%)',
                      yaxis_title='Years to FIRE')
    
    return [
        f"Time to FIRE: {years_to_fire:.1f} years",
        f"Target Amount: ${target_amount:,.2f}",
        f"Required Monthly Savings: ${-required_monthly_savings:,.2f}",
        fig1,
        fig2
    ]

if __name__ == '__main__':
    app.run(debug=True) 