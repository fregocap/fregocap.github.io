import pandas as pd
import plotly.express as px

# Load the data
df = pd.read_csv('https://raw.githubusercontent.com/plotly/datasets/master/earthquakes-23k.csv')

# Create the plot with an open-source map style
fig = px.density_mapbox(
    df, 
    lat='Latitude', 
    lon='Longitude', 
    z='Magnitude',
    radius=10,
    center=dict(lat=0, lon=180), 
    zoom=0,
    mapbox_style="carto-positron",  # Using Carto style which doesn't require a token
    color_continuous_scale="Viridis",
    opacity=0.8,
    title="Global Earthquake Magnitude Distribution"
)

# Update layout for better visibility
fig.update_layout(
    margin={"r":0,"t":30,"l":0,"b":0},
    mapbox=dict(
        bearing=0,
        pitch=0
    )
)

# Create the directory if it doesn't exist
import os
os.makedirs('./assets/html/2025-04-28-distill-example', exist_ok=True)

# Save the plot
fig.write_html(
    './assets/html/2025-04-28-distill-example/plotly_demo_1.html',
    include_plotlyjs=True,
    full_html=True
) 