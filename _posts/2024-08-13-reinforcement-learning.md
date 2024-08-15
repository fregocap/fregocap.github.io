---
layout: post
title:  "Markov Decision Processes"
author: stacknets
categories: [ machine learning, reinforcement learning ]
image: assets/images/reinforcement_learning.jpg
description: "A Markov Decision Process is a mathematical framework used in reinforcement learning to model decision-making in environments where outcomes are partly random and partly under the control of a decision-maker. An MDP consists of states, transition probabilities and rewards. The goal is to find a policy that maximizes the cumulative reward over time."
rating: 3.5
toc: true
---

In this blog post, we are going to talk about Markov Decision Process (MDP). MDPs are very important in the context of reinforcement learning (RL), because lots of RL problems can be put into some form or another as MDPs. For example, the bandit problem, which is a typical RL problem, is actually an MDP with one state. One can also have MDPs with a full observable environment (e.g. chess) or with partially observable environment (financial market).


## What are Markov Processes ?

So, what is a Markov Process anyway ? To understand that, we first need to
clarify what does Markov means.

### Markov Property

If you actually take a random variable \(S\), then the Markov property
tells us that the future values $$S_{t+j}$$ of that variable are
independent of the past values $$S_{t-i}$$, knowing (or conditioned on)
the present value $$S_{t}$$. This is a pretty interesting property,
because it means that all of the history that happened to that variable is
actually irrelevant to the future values of the variable. Imagine a chess game: two of your friends start a game and you let them play, while you cook some delicious meal in the kitchen. Then, one of your friends is kind of tired and does not want to play anymore, but the other is not very happy because he felt he could win the game, and he would like to continue. So, you propose to continue to play, replacing your friend. Should you be aware of all the moves that were done? No. The game is fully characterized by the positions of the pieces at that particular moment. All that really matters for the future of the game is already
on the board.

Mathematically speaking, if we consider a state $$S_{t}$$ (a state,
in general, means "information available at a particular instant $$t$$", in our case the random variable or the chess board with positioning of the pieces), then the probability distribution of the state $$S_{t+1}$$ only depends on $$S_{t}$$, i.e.

$$
\mathbb{P}\left[S_{t+1} \vert S_{t},S_{t-1},\cdots,S_{1},S_{0} \right] = \mathbb{P}\left[S_{t+1} \vert S_{t}\right]
$$

Another way to understand this is to basically consider that you start at a state $$s$$ and you have the next state $$s'$$, then the state transition probability is defined by:

$$
\mathbb{P}\left[S_{t+1} = s' \vert S_t = s \right] = \mathcal{P}_{ss'}.
$$

Therefore, I can transition to the next state that is completely characterized by the present state. Here, we have that $$S_{t+1}$$ is a particular instantiation of $$s'$$, while $$S_{t}$$ corresponds to the state $$s$$.

Once we have that state transition probability $$\mathcal{P}_{ss'}$$, we can represent a state transition matrix $$\mathcal{P}$$, where the index of my rows represent the present state $$s$$ where my system is and the index of the columns represents the potential next state where my system might transition to. Therefore, the matrix $$\mathcal{P}$$ is represented by:

$$
\begin{equation*}
\mathcal{P} = 
\begin{bmatrix}
\mathcal{P}_{11} & \cdots & \mathcal{P}_{1n} \\
\vdots & \ddots & \vdots \\
\mathcal{P}_{n1} & \cdots & \mathcal{P}_{nn}
\end{bmatrix}
\end{equation*}
$$

This matrix provides the full information about how the Markov process evolves. We can sample from it and it will provide different kinds of possible evolutions to my system.

We are finally equipped to define an MDP: it is a sequence of finite states that are fully characterized by the transition probability matrix $$\mathcal{P}$$. Therefore, an MDP can be fully defined by a state space $$\mathcal{S}$$ and a transition probability $$\mathcal{P}$$.

## Rewards

Now that we have defined what a Markov process is, we will dig into the decision part of the MDPs. To be able to take good (whatever that might mean) decisions, we will need to introduce a value judgement that is called the **reward** in the RL framework. Such reward represents what the *agent* gets when it transitions from
the state $$s$$ to the state $$s'$$.

We have now a *Markov reward process*  that is defined through the tuple
$$(\mathcal{S},\mathcal{P},\mathcal{R},\gamma)$$, where $$\mathcal{R}$$ is defined as a reward function that tells us how much reward we get from the state $$s$$, i.e.

$$
\mathcal{R}_s = \mathbb{E}\left[R_t \vert S_t = s\right]
$$

and $$\gamma \in [0,1]$$ is a discount factor that considers what's the importance that we provide to rewards far in the future versus immediate rewards. If we do have $$\gamma = 1$$, then we care about all the rewards far into the future, while in the case $$\gamma=0$$, we care about the immediate rewards only.

Based on that, we can introduce the basic goal in reinforcement learning, which is
to maximize the return $$G_t$$ that corresponds to the total discounted reward
that we sum up over all the states through which the system is gonna pass through,
i.e.

$$
G_t = R_t + \gamma R_{t+1}+\cdots = \sum_{k=0}^{\infty} \gamma^k R_{t+k}.
$$

If we do consider that there is indeed an infinite amount of steps, we do see that the discount factor $$\gamma$$ plays as well a very useful mathematical role, which is to make the series finite. We will not dig into it in here though.

## Value Function

Until now, we did not talk about expectations, because we were considering the case of a particular sample and its corresponding total reward. However, at the end of the day what we do care about is expectations. In the case of MDPs, we talk about **value function** as providing the long-term value of a state $$s$$. Therefore, the expected return from a state $$s$$ is

$$
v(s) = \mathbb{E}\left[G_t \vert  S_t = s \right].
$$

Being in a non-deterministic environment, you don't know exactly what would be your final total return $$G_t$$, but you can compute your expected return based on the transition probability matrix.

## Bellman Equation

Now that we have defined the value function, we can finally introduce the most important relation in all MDPs: the Bellman equation. The basic idea is to split the reward into two parts: the immediate reward that you get and what comes after that immediate reward. Let's introduce the definitions of $$G_t$$ into the previous defintion $$v(s)$$:

$$
\begin{align*}
v(s) &= \mathbb{E}\left[G_t \vert S_t = s\right] \\
&= \mathbb{E}\left[R_t + \gamma R_{t+1} + \gamma^2 R_{t+2}+\cdots \vert S_t = s\right] \\
&= \mathbb{E}\left[R_t + \gamma \left(R_{t+1} + \gamma R_{t+2}+\cdots\right) \vert S_t = s\right] \\
&= \mathbb{E}\left[R_t + \gamma G_{t+1} \vert S_t = s\right] \\
&= \mathbb{E}\left[R_t + \gamma v\left(S_{t+1}\right) \vert S_t = s \right]\\
\end{align*}
$$

You do see a recurrent relation that tells us how good it is to be in a particular state $$s$$ depends on the immediate reward plus how good it is to be in the next state with a discounted factor $$\gamma$$.

Once we have that definition of the value function, we can rewrite it in terms of the transition probability matrix $$\mathcal{P}_{ss'}$$ and the reward function $$\mathcal{R}_{s}$$ at state $$s$$ by just inserting the definitions of the expectations into the equation. That leads to the following relation:

$$
v(s) = \mathcal{R}_s + \gamma \sum_{s' \in \mathcal{S}} \mathcal{P}_{ss'}v(s').
$$

We can also rewrite that Bellman equation into something that is rather
straightforward to understand, which are matrices and vectors:

$$
v = \mathcal{R} + \gamma \mathcal{P}v.
$$

Being a linear equation, we can then invert it, getting:

$$
v = \left(1-\gamma \mathcal{P} \right)^{-1} \mathcal{R}.
$$

There are a bunch of methods that can be used to solve the Bellman equation
for large MDPs, such as linear programming, Temporal-Difference learning, etc. We might address some of those techniques in future blog posts.

Let us now introduce the final essential element of MDPs: actions.

## The Action Space
 
A MDP is basically a Markov reward process with decisions, therefore we can
defined the MDP through the tuple $$\langle \mathcal{S}, \mathcal{A}, \mathcal{P}, \mathcal{R} \rangle$$, where $$\mathcal{A}$$ is a finite set of actions. Based on the existence of such set of actions, we are now able to actually generalize all of the previous concepts introduced. In particular, we can say that the state transition probability matrix depends not only on the state where you are, but as well on the action that you take:

$$
\mathcal{P}_{ss'}^{a} = \mathbb{P}\left[S_{t+} = s' \vert S_t = s, A_t = a\right].
$$

Therefore, the probability of ending up on all the possible different states depends on the action that you take at the instant $$t$$ and at which state you are at time $$t$$. The reward function $$\mathcal{R}$$ might as well depend on the action:

$$
\mathcal{R}^{a}_{s} = \mathbb{E}\left[R_{t+} \vert S_t=s, A_t=a \right].
$$

Apart from that, everything is the same.

## The Policy

We are now well equipped to define what it means to make and take decisions. In order to do that, we need to define what is called a **policy**. The formal definition of a policy $$\pi$$ is a distribution over actions given states:

$$
\pi(a\vert s) = \mathbb{P} \left[A_t = a \vert S_t =s \right]. 
$$

In other words, if our system is in a particular state $$S_t$$, what's the
probability of taking a particular action $$A_t$$. Therefore, once you have a policy you have fully defined the behavior of an agent taking action in a particular system (remember the chess player? That's our agent in that example, i.e. the person taking actions).

Another interesting implication of the Markov property is that the policy only depends on the current state (and not the past states) as we discussed for the Chess example. Therefore, the policy is said to be stationary or time-independent.

Also the policy depends on the rewards through the state where the system is, because the state where the system is characterized by the immediate and expected future rewards of the agent.

What defines a Markov reward process given by a chain of states and rewards
is the averaging over policies of our transition probability matrix and reward function, i.e.

$$
\begin{align*}
\mathcal{P}^{\pi}_{ss'} &= \sum_{a\in \mathcal{A}} \pi(a \vert s) \mathcal{P}^{a}_{ss'} \\
\mathcal{R}^{\pi}_s &= \sum_{a\in \mathcal{A}} \pi(a \vert s) \mathcal{R}^{a}_{s}
\end{align*}
$$

As such the Markov reward process corresponds to the tuple $$\langle \mathcal{S}, \mathcal{P}^{\pi}, \mathcal{R}^{\pi} \rangle$$.

Previously, the value function didn't have any agent, no way to define actions.We have now a way to choose the value function through the policy $$\pi$$ and as such, the *state-value function* $$v_{\pi}(s)$$ of an MDP becomes the expected return from state $$s$$ that follows a policy $$\pi$$

$$
v_{\color{red}{\pi}}(s) =\mathbb{E}_{\color{red}{\pi}}\left[G_t \mid S_t = s \right];
$$

we have an expectation $$\mathbb{E}_{\pi}$$ over the total return when we sample the actions following the policy $$\pi$$.

We can also define a second type of function that is the action value function, which tells us how good it is to take a particular action from a particular state. This is the mathematical object that we should consider when we have to take a particular action. Therefore, the action value function is the expected return from a state $$s$$, taking an action $$a$$ and by following a particular policy $$\pi$$:

$$
q_{\pi}(a,s) = \mathbb{E}_{\pi}\left[G_t \vert S_t = s, A_t = a \right]
$$

A new Bellman equation is obtained, as previously, by decomposing the immediate reward plus the value of the next state:

$$
v_{\pi}(s) = \mathbb{E}_{\pi}\left[R_{t}+\gamma v_{\pi}(S_{t+1}) \vert S_t = s \right].
$$

In a similar way, we can get an equation for the action-value function

$$
q_{\pi}(s,a) = \mathbb{E}_{\pi} \left[R_t+\gamma q_{\pi}(S_{t+1},A_{t+1}) \vert S_t =s \right].
$$

That last equation allows to relate the action-value of the next state with respect to the state where my system is right now.

The way to underst it a bit better is through the relationship that is present between $$v$$ and $$q$$. So, in order to get $$v_{\pi}(s)$$, we are actually averaging over all the possible actions that we might take in the future. Since each action is really *valued* by the action-value function $$q_{\pi}$$ (at the next state), then we need to average over all the action-values under a certain policy $$\pi$$ (since the actions are actually sampled from a particular policy), providing us the value of the present state $$s$$, i.e.

$$
v_{\pi}(s) = \sum_{a \in \mathcal{A}} \pi(a \vert s) q_{\pi}(s,a).
$$

Let's now consider instead that  we are going to take a particular action $$a$$ at a particular state $$s$$. If we take the example of the chess game, we are not asking the question: how good is it to take a specific move, while in the previous paragraph, we were asking how good is it to be where I am now in the game (basically, my probability of winning the game). Therefore, we have to average over the possible states where the action that we are taking are going to lead me (plus the immediate reward), i.e.

$$
q_{\pi}(s,a) = \mathcal{R}^a_{s}+ \gamma \sum_{s' \in \mathcal{S}}\mathcal{P}^a_{ss'}v_{\pi}(s').
$$

If we put the last two equations together, we end up with the following recursive relation

$$
v_{\pi}(s) = \sum_{a \in \mathcal{A}} \pi(a \vert s) \left( \mathcal{R}^a_{s}+ \gamma \sum_{s' \in \mathcal{S}}\mathcal{P}^a_{ss'}v_{\pi}(s')\right)
$$

which is the new Bellman equation for $$v_{\pi}$$ that we were looking for. We can also do the same trick with $$q_{\pi}$$ to end up with the following recursive relation:

$$
q_{\pi}(s) = \mathcal{R}^a_{s} + \gamma \sum_{s' \in \mathcal{S}} \mathcal{P}^a_{ss'} \sum_{a' \in \mathcal{A}} \pi(a' \vert s') q_{\pi}(s', a').
$$

The two equations are actually how we solve the MDPs. If you abstract the math, you understand that the idea behind those two equations are really simple: the value function at the actual step is just the immediate reward plus the value function at the step where you are after taking a particular action.

That's all fine, but what we are looking for the optimal actions to pick. For that, we will need to get the optimal policy.


## The Optimal Policy

Given a state you are in, you want to pick actions that will provide you the maximum future rewards. That policy is called the optimal policy.

Let's first defined the *optimal state-value* function $$v_{*}(s)$$ as being the maximum value function over all possible policies:

$$
v_{*}(s) = \max_{\pi} v_{\pi}(s),
$$

This function basically tells us what's the maximum possible reward we can extract from the particular system we are in. In a similar fashion, one can define the *optimal action-value function* $$q_{*}(s,a)$$ as being the maximum action-value function over all policies

$$
q_{*}(s,a) = \max_{\pi} q_{\pi}(s,a),
$$

meaning if you commit to a particular action, what's the most reward you can get. What's important to notice is that if we know $$q_{*}$$, then we have solved the MDP, because under all policies it allows to understand the maximum reward you can get for a particular action. Therefore, knowing $$q_{*}$$ allows us to behave optimally under the MDP. As such, (and again) solving an MDP is actually getting $$q_*$$.

## Bellman Optimality Equation

Of course, that's all good. But in practice, how do we get $$q_{*}$$ anyways ? Well, you need to actually get the **Bellman optimality equation** and solve it. Before, we were looking at expectation on action and rewards. Now, we are really looking at the maximum returns. So, our two previous equations become:


$$
v_{*}(s) = \max_{a}\mathcal{R}^a_{s} + \gamma \sum_{s' \in \mathcal{S}} \mathcal{P}^{a}_{ss'}v_{*}(s'),
$$

$$
q_{*}(s,a) = \mathcal{R}^a_{s} + \gamma \sum_{s' \in \mathcal{S}} \mathcal{P}^a_{ss'} \max_{a'}q_{*}(s', a'),
$$

based on the fact that an optimal policy is found by maximizing over $$q_{*}(s,a)$$, i.e.

$$
\pi_{*}(a\mid s) = \begin{cases} 1 & \text{if } a= \text{arg}\max_{a\in\mathcal{A}}q_{}(s,a), \\ 0 & \text{otherwise} . \end{cases}
$$

Now that we have the Bellman optimality equation, we should be done. Unfortunately, things are not that easy because in the last two equations $$q_{*}$$ and $$v_{*}$$ are not linear anymore :-( . Moreover, there is no closed form solution because there are some **max** involved that complexifies the problem. So, we have to resort to iterative solution methods such as Q-learning and dynamic programming methods. We will talk about those in a subsequent blog post.

## Conclusion

So, let's stop here. We have put in place the foundations for the understanding of a reinforcement learning setup through the study of MDPs. We have defined the Markov property and the closely related process of Markov Reward Processes. Then, after having introduced rewards, we talked about policies and the actions that are sampled from those policies. We derived some (Bellman) equations that allow to connect the (action)-value function at a certain state with the (action)-value functions at a future state. Finally, we approached the subject of optimal policies and how to choose optimal actions by solving the Bellman optimality equation.