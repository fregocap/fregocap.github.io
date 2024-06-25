---
layout: post
title:  "An Intro to Gaussian Mixture Models"
author: stacknets
categories: [ machine learning, unsupervised learning ]
image: assets/images/main_gmm.png
description: "Latent variables are unseen factors in data that influence observable outcomes, while VAEs are advanced models that learn these underlying structures through a latent space. VAEs are adept at handling complex datasets by leveraging latent representations to interpolate between different data points, like facial expressions in images."
rating: 3.5
hidden: true
toc: true
---

In the realm of data science and machine learning, latent variables are like hidden factors or underlying structures in your data that you can't directly observe. Think of them as the unseen forces that shape and influence the observable data. For example, in a dataset of movie ratings, latent variables could represent abstract concepts like genre preferences or viewing habits. 


## Latent Variables and Deep Generative Models 
Variational AutoEncoders (VAEs) stand out in their ability to handle complex data like images. At their core, VAEs are based on a directed latent-variable model, expressed as 

$$
p(x,z) = p(x|z)p(z),
$$

where $x$ is the observed data (such as an image of a face), and $z$ represents latent variables, the unseen factors influencing $$x$$. 

In the application of VAEs to facial images, the model adeptly learns a latent space $$z$$, which encodes a variety of facial features. This latent space is remarkably versatile. It enables us to interpolate between different facial expressions or other attributes, such as gender, by smoothly varying the values in the latent space. This ability to manipulate latent factors is particularly intriguing because these attributes are not explicitly labeled in the training process. Instead, the model infers them from the data, learning what constitutes a smile, a frown, or any other nuanced facial feature. 

Although we're focusing on a single-layer latent model, it's worthnoting that deep generative models can have multiple layers (e.g., ). These multi-layer models can learn hierarchies of latent representations, capturing more complex and abstract features at each level. 

However, VAEs face two significant challenges: intractability in computation and handling large datasets. The exact computation of the posterior probability is typically not feasible due to its complexity. To navigate this, VAEs apply a strategy called variational inference. This approach involves using an approximate posterior and tweaking it to minimize its divergence from the true posterior. This approximation is crucial for the model to be both computationally feasible and effective in learning the underlying data distribution. We will come back to that point later. 

When it comes to handling large datasets, which is a common scenario in image processing, VAEs adapt by using stochastic gradient descent methods (maybe we should write a blog post about it) that work with small, randomly sampled batches of data. This technique ensures that the model can be trained on large datasets without requiring immense computational resources to process the entire dataset at once. 


## The training process 

In the context of VAEs, several traditional methods encounter significant challenges: 

1. **EM Algorithm**: while the Expectation-Maximization (EM) algorithm is a standard approach for learning latent-variable models, it falters in VAEs because the E-step, which requires computing the approximate posterior , is intractable. Additionally, the M-step, involving parameter learning across the entire dataset, is impractical for large datasets, despite some alleviations offered by online EM using mini-batches.
   
2. **Mean Field Approximation**: This technique falls short in VAEs as it requires computing expectations over a Markov blanket, whose size becomes infeasible when every component of x depends on each component of z. The resulting computational complexity scales exponentially, rending this approach impractical. 

3. **Sampling-Based Methods**: While theoretically sound, sampling-based methods like Metropolis-Hastings struggle to scale to large datasets and require carefully crafted proposal distributions, which are challenging to design. 

### Auto-Encoding Variational Bayes (AEVB) as a Solution
The Auto-Encoding Variational Bayes (AEVB) algorithm emerges as a robust solution to these challenges. It's grounded in variational inference principles and efficiently addresses the three key tasks: learning the model parameters, performing approximate posterior inference over $z$, and handling marginal inference of $$x$$. 

1. **Evidence Lower Bound (ELBO)**: The core of AEVB is to maximize the ELBO,. This maximization tightens around the log probability  while optimizing over .

2. **Optimizing**: The optimization of in AEVB goes beyond mean field's limitations. It involves using a broader class of $q$ distributions, more complex than fully factored ones, and employing gradient descent over , instead of coordinate descent. 

3. **Joint Optimization**: AEVB simultaneously optimizes both  (to keep the ELBO tight around ) and  (to increase the lower bound and hence ), mirroring the lower-bound optimization in EM but in a more scalable and flexible manner. 

### The Score Function Gradient Estimator 

The gradient computation in AEVB is critical: .

1. **Gradient of **: The gradient with respect to  is estimated using Monte Carlo methods by sampling from $$q$$. The swap between gradient and expectation is feasible here.

2. **Gradient of $$q$$**: The challenge is in computing the gradient with respect to $$\phi$$, where directly swapping gradient and expectation isn't possible since the expectation is calculated in relation to the very distribution that is the subject of our differentiation. This is where the reparametrization trick comes into play, enabling efficient and low-variance gradient estimation. 

### Reformulation of the ELBO

The restructuring of the ELBO can be presented in the following manner: 

$$
\log p(x) \geq \mathbb{E_{q_{\phi}(z|x)}}\left[ \log p_{\theta}(x|z) - KL(q_{\phi}(z|x)||p(z))\right]
$$

This formulation can be seen as an alternate yet mathematically equivalent version of the ELBO, deduced through straightforward algebraic steps. 

Looking at this version, it offers a compelling way to interpret the mechanics of the model. Consider any given observed data point, denotaed as $$x$$. The formula is composed of two key parts, each involving the generation of a latent variable  from , which can be seen as a unique 'encoding' of . Here, $$q$$ acts as the 'encoder'. 

The term  is the log-likelihood of observing $x$ when given this 'enconding' . The aim is for , the 'decoder network', to assign a high probability to the true , efficiently 'decoding' or reconstructing  from . This process is known as minimizing the 'reconstruction error'. 

On the other hand, the Kullback-Leibler (KL) divergence, the second component, measures the deviation of the encoded distribution  from a predetermined prior distribution , typically a standard Gaussian. This 'regularization term' encourages the laten representations  to adopt a Gaussian distribution. Its purpose is to ensure that  goes beyond a simple identity mapping, pushing it to learn richer and more complex representations, such as identifying distinct facial features in image-related tasks. 

The overarching goal of this optimization is to fine-tune  so that it maps $x$ into a practical and interpretable latent space $$z$$, enabling the effective reconstruction of $$x$$ using . This objective mirrors the foundational concept of auto-encoder neural networks, which are designed to discover and utilize valuable data representations within a latent space. 

### The reparametrization trick

The reparametrization trick is a crucial component in the VAE framework, primarily because it allows for a more efficient and stable estimation of gradients during the optimization process. This trick was a key innovation in the original VAE paper. 

To understand how this works, consider the distribution , which is the approximate posterior in a VAE. This distribution can be constructed through a two-step process: 

1. **Sampling Noise Variable**: First,a noise variable $$\epsilon$$ is sampled from a simple distribution, typically the standard normal distribution : 

$$\epsilon \sim p(\epsilon)$$

2. **Deterministic Transformation**: Next, this noise variable is transformed using a deterministic function $$g_{\phi}(\epsilon,x)$$, resulting in the variable $$z$$: 

$$z = g_{\phi}(\epsilon,x)$$

This approach ensures that $$z$$, when transformed by $$g_{\phi}$$, follows the desired distribution . 

The simplest illustration of the reparametrization trick is with Gaussian variables. Normally, one might express $$z$$ as being sampled from a Gaussian distribution $$\mathcal{N}(\mu, \sigma)$$:

$$
z\sim q_{\mu,\sigma}(z) = \mathcal{N}(\mu, \sigma)
$$

However, with the reparametrization trick, this is re-expressed as:

$$
z \sim q_{\mu,\sigma}(\epsilon) = \mu + \epsilon \cdot \sigma
$$ 

where $$\epsilon \sim \mathcal{N}(0,1)$$. This reformulation doesn't change the distribution from which $$z$$ is sampled, but it crucially alters how we compute gradients. 

The major advantage of the reparametrization trick is in computing gradients of expectations with respect to $$q(z)$$ for any function $$f$$. It allows us to rewrite the gradien as: 

$$
\nabla_{\phi}\mathbb{E}_{z\sim q_{\phi}(z|x)}\left[f(x,z)\right] = \nabla_{\phi} \mathbb{E}_{\epsilon \sim p(\epsilon)} \left[f(x,g_{\phi}(\epsilon,x))\right] = \mathbb{E}_{\epsilon \sim p(\epsilon)}\left[\nabla_{\phi} f(x,g_{\phi}(\epsilon, x))\right]
$$

This restructed gradient falls inside the expectation, enabling us the use of sampling for estimating the term on the right. This method significantly reduces variance compared to other estimators and is key to effectively learning complex models in VAEs. By placing the gradient inside the expectation, the reparametrization trick not only facilitates a more efficient computation of gradients but also enhances the stability and performance of the learning process in VAEs. 


## Overall

The VAE consists of two primary components: an encoder that maps inputs to a latent space and a decoder that reconstructs inputs from this latent space. Let's summarize how each component is structured and operates within the VAE framework. 

### Encoder Architecture 

1. **Purpose and Function:** The encoder in a VAE is responsible for transforming input data into a representation in the latent space. For an input $x$, the encoder outputs parameters of the probability distribution of the latent variables $z$, typically the mean and variance. 
   
2. **Network Design:** The encoder is usually a neural network. In the context of image processing, this might be a Convolutional Neural Network (CNN) that can effectively capture spatial hierarchies in pixels. For sequential data like text, Recurrent Neural Networks (RNNs) or Transformers might be used. 

3. **Output:** The key output of the encoder is two sets of values corresponding to each dimension of the latent space: the means ($$\mu$$) and variances ($$\sigma^2$$) or standard deviations ($$\sigma$$). These define a Gaussian distribution for each latent variable, from which we sample to obtain the latent representation. 

4. **Reparametrization Trick:** To allow for backpropagation through the stochastic sampling process, the reparametrization trick is used. Instead of sampling $$z$$ directly from the distribution defined by $$\mu$$ and $$\sigma$$, $$z$$ is expressed as $$\mu + \epsilon \cdot \sigma$$, where $$\epsilon$$ is sampled from a standard normal distribution. 

### Decoder Architecture 

1. **Purpose and Function:** The decoder serves the opposite role of the encoder. It takes the latent representation $$z$$ and reconstructs the input data $$x$$. The aim is to generate data that is as close as possible to the original input.
   
2. **Network Design:** The decoder is also a neural network, often mirroring the architecture of the encoder but in reverse. For images, this might involve deconvolutional layers (also known as transposed convolutions) to upsample from the latent representation to the original data dimensions. For sequential data, the decoder could be an RNN or a Transformer generating one element of the sequence at a time.

3. **Output:** The decoder outputs a reconstruction of the original input data. In the case of images, this output is typically the same size as the input image, with each output unit representing a pixel's properties (like color intensity).

4. **Objective Function:** The performance of the decoder is evaluated based on how well the reconstructed data matches the original input. This is often measured by a reconstruction loss, such as mean squared error for continuous data or cross-entropy loss for binary or categorical data.

In summary, the encoder learns to compress data into a compact latent representation, capturing the essential features, while the decoder learns to reconstruct the original data from this compressed form. This architecture allows VAEs to not only generate new data similar to the inputs but also to learn deep representations of the data, useful for various applications like anomaly detection, data denoising, and more. 
