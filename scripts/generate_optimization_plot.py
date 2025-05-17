import numpy as np
import matplotlib.pyplot as plt
import os

def valley_ridge_loss(x, y):
    """Function with valleys, ridges, and a saddle point"""
    # Create a main valley
    valley = 0.1 * (x - 2)**2 + 0.5 * (y - 2)**2
    
    # Add oscillating ridges
    ridges = 0.3 * np.sin(2 * x) * np.cos(y)
    
    # Add a saddle point
    saddle = 0.4 * (x**2 - y**2)
    
    # Add a small quadratic term to ensure minimum
    bowl = 0.05 * (x**2 + y**2)
    
    # Combine terms
    return valley + ridges + saddle + bowl

def gradient_valley_ridge(x, y, noise_scale=0.1):
    """Gradient of the valley-ridge function with added noise for SGD simulation"""
    # Gradient of valley term
    dvalley_dx = 0.2 * (x - 2)
    dvalley_dy = (y - 2)
    
    # Gradient of ridges term
    dridges_dx = 0.6 * np.cos(2 * x) * np.cos(y)
    dridges_dy = -0.3 * np.sin(2 * x) * np.sin(y)
    
    # Gradient of saddle term
    dsaddle_dx = 0.8 * x
    dsaddle_dy = -0.8 * y
    
    # Gradient of bowl term
    dbowl_dx = 0.1 * x
    dbowl_dy = 0.1 * y
    
    # Combined gradient
    dx = dvalley_dx + dridges_dx + dsaddle_dx + dbowl_dx
    dy = dvalley_dy + dridges_dy + dsaddle_dy + dbowl_dy
    
    # Add noise to simulate stochastic gradients
    noise = np.random.normal(0, noise_scale, 2)
    return np.array([dx, dy]) + noise

def sgd(start_point, learning_rate=0.01, n_steps=1000, noise_scale=0.1):
    """Stochastic gradient descent trajectory"""
    trajectory = [start_point]
    point = np.array(start_point)
    
    for _ in range(n_steps):
        grad = gradient_valley_ridge(point[0], point[1], noise_scale)
        point = point - learning_rate * grad
        trajectory.append(point.copy())
    
    return np.array(trajectory)

def sgd_momentum(start_point, learning_rate=0.01, momentum=0.9, n_steps=1000, noise_scale=0.1):
    """Stochastic gradient descent with momentum trajectory"""
    trajectory = [start_point]
    point = np.array(start_point)
    velocity = np.zeros(2)
    
    for _ in range(n_steps):
        grad = gradient_valley_ridge(point[0], point[1], noise_scale)
        velocity = momentum * velocity - learning_rate * grad
        point = point + velocity
        trajectory.append(point.copy())
    
    return np.array(trajectory)

# Create directory if it doesn't exist
os.makedirs('assets/images', exist_ok=True)

# Generate contour plot data with wider domain
x = np.linspace(-6, 6, 300)
y = np.linspace(-8, 10, 300)  # Extended y range to show full trajectory
X, Y = np.meshgrid(x, y)
Z = valley_ridge_loss(X, Y)

# Set random seed for reproducibility
np.random.seed(42)

# Generate trajectories
start_point = [-4, -4]
sgd_trajectory = sgd(start_point, learning_rate=0.003, n_steps=2000, noise_scale=0.1)
sgd_momentum_trajectory = sgd_momentum(start_point, learning_rate=0.008, momentum=0.9, n_steps=2000, noise_scale=0.1)

# Set style
plt.style.use('seaborn-v0_8-whitegrid')
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.sans-serif'] = ['Arial']

# Create the plot
fig, ax = plt.subplots(figsize=(12, 12))  # Make it square to ensure full height is captured

# Create filled contour plot for background with a softer colormap
contourf = ax.contourf(X, Y, Z, levels=50, cmap='RdYlBu_r', alpha=0.15)

# Create contour plot with fewer levels and cleaner lines
contour = ax.contour(X, Y, Z, levels=20, colors='#666666', alpha=0.4, linewidths=0.5)
plt.clabel(contour, inline=True, fontsize=8, fmt='%.1f', colors='#444444')

# Plot trajectories with better colors
ax.plot(sgd_trajectory[:, 0], sgd_trajectory[:, 1], color='#E64B35', linewidth=2.5, label='SGD', alpha=0.9)
ax.plot(sgd_momentum_trajectory[:, 0], sgd_momentum_trajectory[:, 1], color='#4DBBD5', linewidth=2.5, label='SGD with Momentum', alpha=0.9)

# Plot start and end points with larger markers
ax.plot(start_point[0], start_point[1], color='#3C5488', marker='*', markersize=20, label='Start')
ax.plot(sgd_trajectory[-1, 0], sgd_trajectory[-1, 1], color='#E64B35', marker='D', markersize=12, label='SGD Final')
ax.plot(sgd_momentum_trajectory[-1, 0], sgd_momentum_trajectory[-1, 1], color='#4DBBD5', marker='D', markersize=12, label='Momentum Final')

# Add labels and title with larger font
ax.set_xlabel('x', fontsize=12, fontweight='bold', color='#333333')
ax.set_ylabel('y', fontsize=12, fontweight='bold', color='#333333')
ax.set_title('SGD vs SGD with Momentum on Valley-Ridge-Saddle Landscape', 
             fontsize=14, pad=20, fontweight='bold', color='#333333')

# Add legend with better styling
ax.legend(loc='upper right', fontsize=10, framealpha=0.95, edgecolor='#CCCCCC')

# Remove top and right spines
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_color('#666666')
ax.spines['bottom'].set_color('#666666')

# Set aspect ratio to equal
ax.set_aspect('equal')

# Set explicit axis limits to ensure full range is shown
ax.set_xlim(-6, 6)
ax.set_ylim(-8, 10)  # Extended y range to match the data

# Adjust layout with more padding
plt.tight_layout(pad=2.0)

# Save the plot with higher DPI and ensure no clipping
plt.savefig('assets/images/optimization_comparison.png', 
            dpi=300, 
            bbox_inches='tight',
            pad_inches=0.5,
            facecolor='white', 
            edgecolor='none')
plt.close() 