import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from mpl_toolkits.mplot3d import Axes3D
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
import networkx as nx
import math
from scipy.spatial import Delaunay

def create_spin_foam_triangulation(n_nodes=50):
    """
    Create a 3D spin network with proper Delaunay triangulation representing
    quantum spacetime geometry in Loop Quantum Gravity
    """
    # Generate nodes using improved golden spiral for better distribution
    positions = []
    
    # Main spherical distribution
    for i in range(n_nodes):
        # Golden spiral point picking for uniform distribution on sphere
        phi = np.arccos(1 - 2 * (i + 0.5) / n_nodes)
        theta = np.pi * (1 + 5**0.5) * (i + 0.5)
        
        # Variable radius for 3D volume filling
        r = 0.6 + 0.6 * np.random.random()
        
        # Convert to Cartesian
        x = r * np.sin(phi) * np.cos(theta)
        y = r * np.sin(phi) * np.sin(theta)
        z = r * np.cos(phi)
        
        positions.append([x, y, z])
        
        # Add interior points for better triangulation density
        if i % 4 == 0 and i < n_nodes * 0.3:
            r_inner = r * 0.4 * (0.5 + np.random.random())
            x_inner = r_inner * np.sin(phi) * np.cos(theta)
            y_inner = r_inner * np.sin(phi) * np.sin(theta)  
            z_inner = r_inner * np.cos(phi)
            positions.append([x_inner, y_inner, z_inner])
    
    points = np.array(positions)
    
    # Assign SU(2) representation spins (physical values in LQG)
    # Higher probability for lower spins (more physical)
    spin_choices = [0.5, 1, 1.5, 2, 2.5]
    spin_probs = [0.4, 0.3, 0.15, 0.1, 0.05]  # Lower spins more likely
    spins = np.random.choice(spin_choices, size=len(points), p=spin_probs)
    
    # Create Delaunay triangulation (fundamental to LQG discretization)
    tri = Delaunay(points)
    
    # Build graph from triangulation
    G = nx.Graph()
    for i in range(len(points)):
        G.add_node(i)
    
    # Extract edges from tetrahedra
    edges = set()
    for simplex in tri.simplices:
        for i in range(4):
            for j in range(i+1, 4):
                edge = tuple(sorted([simplex[i], simplex[j]]))
                edges.add(edge)
    
    for i, j in edges:
        G.add_edge(i, j)
    
    # Calculate edge properties based on LQG physics
    edge_data = []
    for i, j in G.edges():
        # Edge spin determines quantum area eigenvalue
        # In LQG, we often use average or minimum of adjacent vertex spins
        edge_spin = min(spins[i], spins[j])  # More physical choice
        
        # Area eigenvalue: A = 8πγℓ²√(j(j+1)) where γ ≈ 0.24, ℓ = Planck length
        area_quantum = np.sqrt(edge_spin * (edge_spin + 1))
        
        edge_data.append({
            'spin': edge_spin,
            'area': area_quantum,
            'color_val': edge_spin,
            'width': 1 + area_quantum * 0.8
        })
    
    return G, points, spins, tri, edge_data

def calculate_vertex_volume(vertex_idx, spins, G):
    """
    Calculate volume quantum number at vertex based on LQG volume operator
    Simplified version: depends on spins of incident edges
    """
    neighbors = list(G.neighbors(vertex_idx))
    if len(neighbors) == 0:
        return 1.0
    
    # Volume operator in LQG is complex, this is a simplified approximation
    # Real volume depends on intertwiners and detailed geometry
    incident_spins = [spins[vertex_idx]] + [spins[n] for n in neighbors[:6]]  # Limit for visualization
    volume_contrib = sum(j * (j + 1) for j in incident_spins)
    
    return np.sqrt(volume_contrib)

def update_frame(frame, ax, G, points, spins, tri, edge_data):
    """Update animation frame with quantum fluctuations and rotation"""
    ax.clear()
    ax.set_axis_off()
    ax.set_facecolor('white')
    plt.gcf().set_facecolor('white')
    
    # Quantum fluctuations - small time-dependent deformations
    fluctuation_amplitude = 0.02
    time = frame * 0.05
    
    deformed_points = points.copy()
    for i in range(len(points)):
        # Quantum geometric fluctuations
        # Different frequency for each spatial direction
        jitter_x = fluctuation_amplitude * np.sin(time + i * 0.1) * np.cos(i * 0.2)
        jitter_y = fluctuation_amplitude * np.cos(time + i * 0.15) * np.sin(i * 0.3)
        jitter_z = fluctuation_amplitude * np.sin(time + i * 0.2) * np.cos(i * 0.1)
        
        # Scale fluctuations by spin value (higher spin = more quantum uncertainty)
        spin_factor = spins[i] / 2.0
        deformed_points[i, 0] += jitter_x * spin_factor
        deformed_points[i, 1] += jitter_y * spin_factor
        deformed_points[i, 2] += jitter_z * spin_factor
    
    x, y, z = deformed_points.T
    
    # Draw vertices (representing quantized volumes)
    vertex_volumes = [calculate_vertex_volume(i, spins, G) for i in range(len(points))]
    node_sizes = [80 + vol * 25 for vol in vertex_volumes]  # Increased base size
    
    # Color vertices by spin value with better contrast for white background
    scatter = ax.scatter(x, y, z, c=spins, s=node_sizes, alpha=0.9, 
                        cmap='viridis', vmin=0.5, vmax=2.5, edgecolors='black', linewidth=1.5)
    
    # Draw edges (representing quantized areas)
    for i, (u, v) in enumerate(G.edges()):
        edge_info = edge_data[i]
        
        # Edge color represents spin/area quantum number - using darker colors for white background
        color = plt.cm.plasma(edge_info['color_val'] / 2.5)
        
        # Line width represents area eigenvalue - increased for better visibility
        width = edge_info['width'] * 1.5
        
        # Add some pulsing based on quantum fluctuations
        pulse = 1 + 0.2 * np.sin(time * 2 + i * 0.3)
        width *= pulse
        
        ax.plot([x[u], x[v]], [y[u], y[v]], [z[u], z[v]], 
                color=color, linewidth=width, alpha=0.8)
    
    # Draw selected tetrahedra (4-simplices of quantum spacetime)
    # Only show subset to avoid clutter
    n_display_tetra = min(len(tri.simplices) // 6, 15)
    display_indices = np.random.choice(len(tri.simplices), size=n_display_tetra, replace=False)
    
    for idx in display_indices:
        tetra = tri.simplices[idx]
        tetra_points = [deformed_points[tetra[j]] for j in range(4)]
        
        # Calculate average spin for coloring
        avg_spin = np.mean([spins[tetra[j]] for j in range(4)])
        face_color = plt.cm.plasma(avg_spin / 2.5)
        
        # Create the 4 triangular faces of the tetrahedron
        faces = [
            [tetra_points[0], tetra_points[1], tetra_points[2]],
            [tetra_points[0], tetra_points[1], tetra_points[3]],
            [tetra_points[0], tetra_points[2], tetra_points[3]],
            [tetra_points[1], tetra_points[2], tetra_points[3]]
        ]
        
        # Add translucent tetrahedra with better visibility on white background
        collection = Poly3DCollection(faces, alpha=0.08, linewidths=0.5, 
                                     edgecolors='darkblue', facecolors=face_color)
        ax.add_collection3d(collection)
    
    # Highlight high-spin vertices (represent complex intertwiners)
    high_spin_indices = [i for i, spin in enumerate(spins) if spin >= 2.0]
    if high_spin_indices:
        high_spin_x = [x[i] for i in high_spin_indices]
        high_spin_y = [y[i] for i in high_spin_indices]
        high_spin_z = [z[i] for i in high_spin_indices]
        high_spin_sizes = [node_sizes[i] * 0.3 for i in high_spin_indices]
        
        ax.scatter(high_spin_x, high_spin_y, high_spin_z, 
                  color='red', s=high_spin_sizes, alpha=1.0, marker='*', edgecolors='darkred', linewidth=1)
    
    # Set equal aspect ratio and limits - ZOOMED IN for better detail
    max_range = 1.0  # Reduced from 1.8 to zoom in closer
    ax.set_xlim(-max_range, max_range)
    ax.set_ylim(-max_range, max_range)
    ax.set_zlim(-max_range, max_range)
    
    # Smooth rotation for better visualization
    elevation = 20 + 15 * np.sin(frame * 0.008)
    azimuth = frame * 0.5 % 360
    ax.view_init(elev=elevation, azim=azimuth)
    
    # Add title with physics information - dark text for white background
    title = f"Loop Quantum Gravity: Spin Foam Triangulation\nFrame {frame}"
    ax.text2D(0.05, 0.95, title, transform=ax.transAxes, 
              color='black', fontsize=12, weight='bold')
    
    # Add legend - dark text for white background
    legend_text = ("Vertices: Quantized Volumes\n"
                  "Edges: Quantized Areas\n" 
                  "Tetrahedra: 4-Simplices\n"
                  "★ High-spin intertwiners")
    ax.text2D(0.05, 0.15, legend_text, transform=ax.transAxes,
              color='darkblue', fontsize=9, verticalalignment='top', weight='bold')

def create_lqg_spin_foam_animation():
    """
    Create animated visualization of Loop Quantum Gravity spin foam
    representing the quantum structure of spacetime
    """
    print("Generating quantum spacetime triangulation...")
    
    # Create the quantum geometric structure
    G, points, spins, tri, edge_data = create_spin_foam_triangulation(n_nodes=40)
    
    print(f"Created spin network with {len(points)} vertices and {len(G.edges())} edges")
    print(f"Delaunay triangulation has {len(tri.simplices)} tetrahedra")
    
    # Set up the plot
    fig = plt.figure(figsize=(12, 10), facecolor='white')  # Changed to white background
    ax = fig.add_subplot(111, projection='3d')
    ax.set_facecolor('white')
    
    # Create animation
    print("Creating animation...")
    frames = 200
    ani = FuncAnimation(fig, update_frame, frames=frames,
                       fargs=(ax, G, points, spins, tri, edge_data),
                       interval=80, blit=False, repeat=True)
    
    # Save as GIF
    print("Saving animation...")
    ani.save('lqg_spin_foam_quantum_spacetime.gif', writer='pillow', fps=12, dpi=100)
    print("Animation saved as 'lqg_spin_foam_quantum_spacetime.gif'")
    
    # Also create a high-quality static frame
    update_frame(0, ax, G, points, spins, tri, edge_data)
    plt.savefig('lqg_spin_foam_static.png', dpi=200, bbox_inches='tight',
                facecolor='white', edgecolor='none')  # Changed to white background
    print("Static frame saved as 'lqg_spin_foam_static.png'")
    
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    create_lqg_spin_foam_animation()