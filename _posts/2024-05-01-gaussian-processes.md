---
layout: post
title:  "An Introduction to Gaussian Mixture Models"
author: stacknets
categories: [ unsupervised learning, machine learning ]
image: assets/images/dalle.jpg
description: "Gaussian Mixture Models (GMMs) are powerful unsupervised learning tools used to model multimodal data distributions through a combination of multiple Gaussian distributions, applicable in various fields such as image segmentation, clustering, and audio feature extraction, leveraging the Expectation-Maximization (EM) algorithm for parameter estimation."
rating: 3.5
hidden: true
toc: true
---

In this blog post, we will explore the concept of **Gaussian Mixture Models** (GMMs). These models are intuitive and widely applicable in various domains such as image segmentation, clustering, and generative modeling.

## Introduction to GMMs

Gaussian Mixture Models are used to model an overall distribution through multiple Gaussian distributions. They are a powerful tool for capturing, estimating, and clustering parts of an overall distribution as locally Gaussian-distributed. GMMs are unsupervised models, meaning they do not need to know the specific Gaussian distribution a data point belongs to in advance.

### Example of GMM

Here's a simple example to illustrate GMMs:

```python
import matplotlib.pyplot as plt
import numpy as np
from scipy import stats

# first gaussian
mean1 = 0
standard_deviation = 1
x = np.arange(-10,10,0.1)
y1 = stats.norm(mean1, standard_deviation)

# second gaussian
mean2 = -2.5
y2 = stats.norm(mean2, standard_deviation)

# third gaussian
mean3 = 2.5
y3 = stats.norm(mean3, standard_deviation)

# overall plotting
plt.plot(x, y1.pdf(x), '--', c='gray')
plt.plot(x, y2.pdf(x), '--', c='gray')
plt.plot(x, y3.pdf(x), '--', c='gray')
plt.plot(x, y1.pdf(x)+y2.pdf(x)+y3.pdf(x), c='black')
plt.xlabel('Coordinates')
plt.ylabel('Density')
plt.show()
```
This example shows three Gaussian distributions fitting an overall distribution, with the black line representing the combined distribution.

## Application of GMMs

GMMs have numerous applications, including: 

- Image segmentation 
- Multi-object tracking in videos
- Audio feature extraction 

They are particularly useful for multimodal distributions, where multiple peaks are present. These peaks can be modeled using multiple Gaussian distributions.

## Mathematical Formulation of GMMs

To represent GMMs mathematically, we need to understand three types of parameters: 

1. **Mixture Weights** ($$\phi$$): indicate the probability that a point belongs to a specific Gaussian component $$K$$. 
2. **Means** ($$\mu$$): the centers of each Gaussian component.
3. **Covariances** ($$\mathbf{\Sigma}_i$$): describe the spread and orientation of each Gaussian component.

The probability density function for a GMM is given by: 

$$
p(\mathbf{x}) = \sum_{i=1}^K \phi_i(\mathbf{x}) \mathcal{N}(\mathbf{x}|\mathbf{\mu}_i, \mathbf{\Sigma}_i)
$$

where $$\mathcal{N}(\mathbf{x}\vert\mathbf{\mu}_i, \mathbf{\Sigma}_i)$$ is the multivariate Gaussian distribution.

###