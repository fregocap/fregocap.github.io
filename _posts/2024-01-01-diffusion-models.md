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

At their core, diffusion models are a type of generative model, a family of algorithms designed to produce new data samples that mimic a given distribution. Unlike their predecessors (like GANs or VAEs), diffusion models operate on a novel principle: they systematically add noise to data and then learn to reverse this process.

### The Process: From Noise to Clarity

Diffusion models are inspired by the natural diffusion process, where particles move from regions of higher concentration to lower concentration until they are evenly distributed. In the context of generative modeling, this concept is metaphorically applied to data. The model starts with a piece of structured data, like an image or a text, and gradually introduces random noise over several iterations or steps. This process known as forward diffusion, incrementally adds Gaussian noise until the original data transforms into a state of pure, unstructured noise.

One of the most striking aspects of diffusion models is their gradual, stepwise approach to both deterioration and reconstruction. Unlike some generative models that attempt to generate data in a single step, diffusion models embrace a more nuanced path. This gradualism allows for a more controlled generation process and often results in higher-quality, more diverse samples. It's a journey through a landscape of noise and structure, where each step is a careful move towards creating something new and unique from the vestiges of the old.

#### 1. Forward Diffusion - The Art of Structured Deterioration 

The forward diffusion process is methodical and controlled, typically occurring over hundreds or even thousands of steps. At each step, a small amount of Gaussian noise is added according to the equation $$\mathbf{x}_t = \sqrt(1-\beta_t)\mathbf{x}_{t-1}+\sqrt{\beta_t}\epsilon$$ where $$\mathbf{x}_t$$ represents data at timestamp $$t$$, $$\beta_t$$ is the noise variance, and $$\epsilon$$ is a standard normal sample. This gradual addition of noise, governed by a predefined variance schedule, carefully obscures the data's structure while retaining latent traits of the initial input, ultimately transforming it into a purely noisy state. As previously said, the amount of Gaussian noise added at each step is governed by a fixed variance schedule with the following predefined properties:

$$
\begin{equation}
   q(\mathbf{x}_t | \mathbf{x}_{t-1}) = \mathcal{N}\left(\mathbf{x}_t; \sqrt{1-\beta_t} \mathbf{x}_t, \beta_t \mathbf{I} \right)
\end{equation}
$$

As $$t$$ nears $$T$$, the sample $$\mathbf{x}_0$$ progressively loses its distinct characteristics, eventually becoming fully noised, such that $$\mathbf{x}_T$$ aligns with a Gaussian distribution. Essentially, $$q(\mathbf{x}_t \vert \mathbf{x}_{t-1})$$ denotes the transition probability distribution, or the noise added, between $$\mathbf{x}_{t-1}$$ and $$\mathbf{x}_t$$.

![noise]({{ site.baseurl }}/assets/images/noisy_person.jpg)

#### 2. Reverse Diffusion - Reclaiming Order from Chaos 

Reverse Diffusion is where diffusion models unveil their true capability. After forward diffusion has transformed the data into noise, reverse diffusion meticulously retraces this path, reconstructing the original data from its noisy state. This process, governed by a learned reverse Markov chain, involves a series of probabilistic steps that gradually subtract the noise, guided by the equation:

$$
\begin{equation}
p_{\theta}(\mathbf{x}_{t-1}\vert \mathbf{x}_t) = \mathcal{N}(\mathbf{x}_{t-1}; \mu_{\theta}(\mathbf{x}_t, t),\Sigma_{\theta}(\mathbf{x}_t, t))
\end{equation}
$$

where $$\mu_{\theta}$$ is the predicted mean, and $$\Sigma_{\theta}$$ is the predicted variance of the noise that was added to the data. The variance is usually fixed in practice. Therefore, to estimate the target denoising step, it is sufficient to approximate the mean of the noise added during the forward process. This is achieved through a denoising neural network, which specifically focuses on predicting this noise mean at each step.

![flower_noise]({{ site.baseurl }}/assets/images/flower_diffusion.jpg)

This iterative denoising is not a simple inversion but a complex, learned reconstruction. The model, trained through advanced deep learning techniques, has learned the intricate dance of adding and removing noise. Each step in the reverse process is a delicate balance, seeking to predict and correct the previous step's output, effectively moving from randomness back to the structured data. This journey from noise back to structured data is a testament to the model's power, demonstrating its ability to not just mimic but creatively re-interpret the original data distribution. It's this capability that allows diffusion models to generate new, coherent samples that are not mere replicas but variations of the original data, reflecting both the model's understanding and its creative potential. As the reverse diffusion unfolds, the data passes through various stages of clarity, offering a fascinating glimpse into the model's learning process and the subtle ways it captures and redefines the data's inherent patterns. This process doesn't just generate images or text; it reshapes our understanding of what's possible in the realm of generative AI, opening new doors for exploration and discovery.

#### 3. Training 

Training diffusion models involves a detailed mathematical process, centered on optimization which involves adjusting the model parameters to minimize the difference between the original data and its reconstruction from noise.

The training objective can be expressed as minimizing the sum of Kullback-Leibler (KL) divergences between the forward and reverse processes at each timestep. 

$$
\begin{equation}
L_{t-1} = D_{\text{KL}}(q(\mathbf{x}_{t-1}\vert \mathbf{x}_{t}, \mathbf{x}_{0}) \vert \vert p_{\theta}(\mathbf{x}_{t-1} \vert \mathbf{x}_{t}))
\end{equation}
$$

Essentially, this means (as previously said) the model learns to approximate the noise added during the forward process. While the derivation of the training is intricate, it essentially boils down to minimizing the discrepancy between the actual denoising at each step $$t$$ and the noise predicted by a neural network 
$$\epsilon_{\theta}(\mathbf{x}_{t},t)$$. This network, adjustable during training, takes the current noised sample $$\mathbf{x}_{t}$$ and the time step $$t$$ as inputs, aiming to closely replicate the true denoising process. 

The loss, after a lengthy calculation, takes a simpler form: 

$$
\begin{equation}
L_{\text{simple}} = \mathbb{E}_{\mathbf{x}_{0}, \epsilon_t} \left[\Vert \epsilon_t - \epsilon_{\theta}(\mathbf{x}_{t}, t) \Vert^2\right]
\end{equation}
$$

By training the model to minimize this divergence, it learns to reverse the diffusion process accurately, enabling the generation of coherent and high-quality data samples from noise.

### The Architecture: U-Net

The U-Net architecture, pivotal in the training of diffusion models, is renowned for its effectiveness in processing and reconstructing complex data structures. Originating from biomedical image segmentation, U-Net features a distinctive symmetric encoder-decoder structure enhanced by skip connections, which facilitate the flow of information and gradients through the network. This design enables U-Net to capture both high-level overview and fine-grained details of the input data, making it particulary adept at understanding and reconstructing the intricate patterns necessary for reverse diffusion processes.

![u_net]({{ site.baseurl }}/assets/images/unet.png)

In the context of diffusion models, U-Net is commonly employed to predict the noise at each timestep or directly estimate the denoised data. Its capability to handle multi-scale features and maintain spatial hierarchies is crucial in enabling diffusion models to gradually refine their outputs, step by step, leading to the generation of coherent and high-fidelity samples. The use of U-Net in diffusion models represent a harmonious blend of architecture and algorithm, where the structure of U-Net complements the iterative nature of the diffusion process, ensuring that each step towards denoising is informed and precise. As research progresses, the adaptability and effectiveness of U-Net in various modifications and improvements signify its continuing importance in the evolving landscape of generative models.

### Practical Applications: A Universe of Possibilities

Diffusion models aren't just theoretical marvels; they have practical implications across various domains:

- **Image Generation**: OpenAI's DALL-E 2 can generate diverse and intricate images from textual descriptions, and Google's Imagen is known for producing photorealistic images. These models demonstrate the power of diffusion techniques in creating high-quality visual content from a variety of inputs.

- **Temporal Data Modeling**: Diffusion models have been proved to be useful for forecasting and understanding sequences in areas like climate science, where they help model weather patterns over time. Their ability to understand and generate complex sequences makes them valuable for analyzing trends and making predictions in various time-sensitive domains.

![ensemble_denoising]({{ site.baseurl }}/assets/images/ensemble_diffusion.jpg)

- **Interdiscplinary Applications**: Diffusion models offer an innovative approach to molecular design, iteratively refining noise into structured molecules. Unlike traditional models that assume atom independence or require arbitrary atom ordering, diffusion models enable a gradual, controlled design process, similar to AlphaFold2's method of refining protein structures. This capability allows for the correction of errors and leads to more accurate molecular configurations, revolutionizing the field of computational chemistry. Read more on the subject in [Hoogeboom et al. 2022](https://arxiv.org/pdf/2203.17003){:target="_blank"}  and in [Schneuing et al. 2023](https://arxiv.org/pdf/2210.13695){:target="_blank"} .

![molecule_generation]({{ site.baseurl }}/assets/images/molecules_diffusion_models.png)

### The Future: Boundless Horizons

The future of diffusion models is as exciting as their present. Ongoing research focuses on enhancing their efficiency, accuracy, and adaptability to different data structures. As these models continue to evolve, we can expect them to unlock even more applications, potentially transforming entire industries.

Diffusion models stand as a testament to the incredible progress in machine learning and AI. They blend complex mathematical theory with practical utility, pushing the boundaries of what's possible in data generation and beyond. As we continue to explore and refine these models, we stand on the brink of a new era in generative modeling, full of possibilities yet to be discovered.