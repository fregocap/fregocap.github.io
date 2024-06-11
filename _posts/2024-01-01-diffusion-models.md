---
layout: post
title:  "Unlocking Creativity: Dalle 2 & Diffusion Models"
author: stacknets
categories: [ deep learning, artificial intelligence ]
image: assets/images/dalle.jpg
description: "My review of Inception movie. Acting, plot and something else in this short description."
featured: true
hidden: true
rating: 4.5
---

In the rapidly evolving landscape of generative models, diffusion models have emerged as a groundbreaking approach, reshaping our understanding and capabilities in fields like image synthesis and beyond. Let's delve into this fascinating world, breaking down complex concepts into digestible insights.

### Understanding the basics

At their core, diffusion models are a type of generative model, a family of algorithms designed to produce new data samples that mimic a give distribution. Unlike their predecessors (like GANs or VAEs), diffusion models operate on a novel principle: they systematically add noise to data and then learn to reverse this process.

### The Process: From Noise to Clarity

Diffusion models are inspired by the natural diffusion process, where particles move from regions of higher concentration to lower concentration until they are evenly distributed. In the context of generative modeling, this concept is metaphorically applied to data. The model starts with a piece of structured data, like an image or a text, and gradually introduces random noise over several iterations or steps. This process known as forward diffusion, incrementally adds Gaussian noise until the original data transforms into a state of pure, unstructured noise.

One of the most striking aspects of diffusion models is their gradual, stepwise approach to both deterioration and reconstruction. Unlike some generative models that attempt to generate data in a single step, diffusion models embrace a more nuanced path. This gradualism allows for a more controlled generation process and often results in higher-quality, more diverse samples. It's a journey through a landscape of noise and structure, where each step is a careful move towards creating something new and unique from the vestiges of the old.

#### 1. Forward Diffusion - The Art of Structured Deterioration 

The forward diffusion process is methodical and controlled, typically occurring over hundreds or even thousands of steps. At each step, a small amount of Gaussian noise is added according to the equation $$\mathbf{x}_t = \sqrt(1-\beta_t)\mathbf{x}_{t-1}+\sqrt{\beta_t}\epsilon$$ where $$\mathbf{x}_t$$ represents data at timestamp $$t$$, $$\beta_t$$ is the noise variance, and $$\epsilon$$ is a standard normal smaple. This gradual addition of noise, governed by a predefined variance schedule, carefully obscures the data's structure while retaining latent traits of the initial input, ultimately transforming it into a purely noisy state. As previously said, the amount of Gaussian noise added at each step is governed by a fixed variance schedule with the following predefined properties:

$$
\begin{equation}
   q(\mathbf{x}_t | \mathbf{x}_{t-1}) = \mathcal{N}\left(\mathbf{x}_t; \sqrt{1-\beta_t} \mathbf{x}_t, \beta_t \mathbf{I} \right)
\end{equation}
$$

As $$t$$ nears $$T$$, the sample $$\mathbf{x}_0$$ progressively loses its distinct characteristics, eventually becoming fully noised, such that $$\mathbf{x}_T$$ aligns with a Gaussian distribution. Essentially, $$q(\mathbf{x}_t \vert \mathbf{x}_{t-1})$$ denotes the transition probability distribution, or the noise added, between $$\mathbf{x}_{t-1}$$ and $$\mathbf{x}_t$$.

![noise]({{ site.baseurl }}/assets/images/noisy_person.jpg)

#### 2. Reverse Diffusion - Reclaiming Order from Chaos 

Reverse Diffusion is where diffusion models unveil their true capability. After forward diffusion has transformed the data into noise, reverse diffusion meticulously retraces this path, reconstructing the original data from its noisy state. This process, governed by a learned reverse Markov chain, involves a series of probabilistic steps that gradually subtract the noise, guided by the equation:




