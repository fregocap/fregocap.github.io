---
layout: page
title: FIRE Calculator
permalink: /fire-calculator/
---

<div class="fire-calculator-container">
    <div class="fire-intro">
        <h1>FIRE Calculator</h1>
        <p>Calculate your path to Financial Independence and Early Retirement (FIRE) using this interactive calculator. Adjust your savings, expenses, and investment returns to see how they affect your journey to financial freedom.</p>
    </div>

    <div class="calculator-iframe-container">
        <iframe 
            src="/assets/html/fire-calculator/index.html" 
            width="100%" 
            height="100%" 
            frameborder="0"
            style="background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
        ></iframe>
    </div>

    <div class="fire-explanation">
        <h2>Understanding the Results</h2>
        <div class="explanation-grid">
            <div class="explanation-item">
                <h3>Time to FIRE</h3>
                <p>This shows how many years it will take to reach your target amount based on your current savings rate and expected returns.</p>
            </div>
            <div class="explanation-item">
                <h3>Target Amount</h3>
                <p>Calculated using the 4% rule: your annual expenses multiplied by 25. This is the amount you need to safely withdraw 4% annually in retirement.</p>
            </div>
            <div class="explanation-item">
                <h3>Monthly Savings Needed</h3>
                <p>The amount you need to save each month to reach your target by your desired retirement age.</p>
            </div>
            <div class="explanation-item">
                <h3>Savings Projection</h3>
                <p>Shows how your savings will grow over time, including the impact of compound interest.</p>
            </div>
        </div>
    </div>
</div>

<style>
.fire-calculator-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.fire-intro {
    text-align: center;
    margin-bottom: 2rem;
}

.fire-intro h1 {
    color: var(--text-color);
    margin-bottom: 1.5rem;
    font-size: 2.5rem;
}

.fire-intro p {
    color: var(--text-color);
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
    font-size: 1.1rem;
}

.calculator-iframe-container {
    height: 1500px;
    margin: 2rem 0;
    position: relative;
}

.fire-explanation {
    margin-top: 2rem;
}

.fire-explanation h2 {
    text-align: center;
    margin-bottom: 3rem;
    color: var(--text-color);
    font-size: 2rem;
}

.explanation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.explanation-item {
    background: var(--bg-color);
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.explanation-item h3 {
    color: var(--text-color);
    margin-bottom: 1rem;
    font-size: 1.3rem;
}

.explanation-item p {
    color: var(--text-color);
    line-height: 1.6;
    font-size: 1.1rem;
}

@media (max-width: 768px) {
    .explanation-grid {
        grid-template-columns: 1fr;
    }
    
    .fire-intro h1 {
        font-size: 2rem;
    }
    
    .fire-explanation h2 {
        font-size: 1.8rem;
    }
    
    .calculator-iframe-container {
        height: 1000px;
    }
}
</style> 