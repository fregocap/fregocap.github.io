import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from mpl_toolkits.mplot3d import Axes3D
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

# Generate surface plot data
x = np.linspace(-6, 6, 100)
y = np.linspace(-8, 10, 100)
X, Y = np.meshgrid(x, y)
Z = valley_ridge_loss(X, Y)

# Set random seed for reproducibility
np.random.seed(42)

# Generate trajectories
start_point = [-4, -4]
sgd_trajectory = sgd(start_point, learning_rate=0.003, n_steps=2000, noise_scale=0.1)
sgd_momentum_trajectory = sgd_momentum(start_point, learning_rate=0.008, momentum=0.9, n_steps=2000, noise_scale=0.1)

# Create the figure and 3D axis
fig = plt.figure(figsize=(12, 8))
ax = fig.add_subplot(111, projection='3d')

# Plot the surface with adjusted transparency and colormap
surf = ax.plot_surface(X, Y, Z, cmap='RdYlBu_r', alpha=0.4, antialiased=True, 
                      rcount=100, ccount=100)  # Increased resolution

# Initialize empty lines for trajectories with thicker lines
sgd_line, = ax.plot([], [], [], color='#E64B35', linewidth=3, label='SGD', alpha=0.9)
momentum_line, = ax.plot([], [], [], color='#4DBBD5', linewidth=3, label='SGD with Momentum', alpha=0.9)
start_point_plot = ax.scatter([], [], [], c='#3C5488', marker='*', s=150, label='Start')

# Set labels and title
ax.set_xlabel('x', fontsize=12, fontweight='bold')
ax.set_ylabel('y', fontsize=12, fontweight='bold')
ax.set_zlabel('Loss', fontsize=12, fontweight='bold')
ax.set_title('3D Visualization of SGD vs Momentum Optimization', fontsize=14, pad=20)

# Set the initial viewing angle for better path visibility
ax.view_init(elev=20, azim=45)

# Set axis limits to ensure consistent view
ax.set_xlim(-6, 6)
ax.set_ylim(-8, 10)
ax.set_zlim(Z.min(), Z.max())

# Add legend with better styling
ax.legend(loc='upper right', framealpha=0.9)

def init():
    sgd_line.set_data([], [])
    sgd_line.set_3d_properties([])
    momentum_line.set_data([], [])
    momentum_line.set_3d_properties([])
    start_point_plot._offsets3d = ([], [], [])
    return sgd_line, momentum_line, start_point_plot

def animate(i):
    # Update SGD trajectory
    sgd_line.set_data(sgd_trajectory[:i, 0], sgd_trajectory[:i, 1])
    sgd_line.set_3d_properties([valley_ridge_loss(x, y) for x, y in sgd_trajectory[:i]])
    
    # Update momentum trajectory
    momentum_line.set_data(sgd_momentum_trajectory[:i, 0], sgd_momentum_trajectory[:i, 1])
    momentum_line.set_3d_properties([valley_ridge_loss(x, y) for x, y in sgd_momentum_trajectory[:i]])
    
    # Update start point
    if i == 0:
        start_point_plot._offsets3d = ([start_point[0]], [start_point[1]], [valley_ridge_loss(*start_point)])
    
    # Rotate the view more slowly and with a better range
    ax.view_init(elev=20 + 10 * np.sin(i/180 * np.pi),  # Oscillate elevation slightly
                azim=i/2)  # Full 360 rotation
    
    return sgd_line, momentum_line, start_point_plot

# Create animation with more frames for smoother rotation
anim = FuncAnimation(fig, animate, init_func=init, frames=360, interval=20, blit=True)

# Save animation with higher quality
anim.save('assets/images/optimization_3d.gif', 
          writer='pillow', 
          fps=30, 
          dpi=150,  # Increased DPI for better quality
          savefig_kwargs={'facecolor': 'white'})
plt.close() 