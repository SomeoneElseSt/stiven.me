I have read many technical blogs that clarified my understanding of some topics in the past. Some notable shoutouts are [this](https://colah.github.io/posts/2015-09-Visual-Information/) visual information theory breakdown, and [this](https://logan-thomas.com/2021/01/23/maxwell-demon/) post on Maxwell's demon. They are both very thorough and I recommend you read them.

I think technical blogs are an essential source of knowledge, because in order for someone to write them, they need to understand deeply (and empirically) whatever they're trying to explain to you. Plus, they are also written in a way that you're supposed to understand, unlike papers. I encourage you to write one of your own!


This brief write-up is my first attempt to contribute back by illustrating some interesting geometrical properties of binomial events I found through a statistics class I'm taking this semester. 

Picture a fair coin. There are two outcomes: heads or tails, each with a 50% chance, respectively. 

If you wanted to know the chances that this coin lands on heads **N** times consecutively, and each flip is independent, you can just multiply:

$$
P(\text{heads } N \text{ times}) = \left(\frac{1}{2}\right)^N
$$

Now, you probably already know these formulas if you took a probability class in college or high school. 

What you might not have learned there is that geometry is a powerful way of describing probability, specifically when partitioning a set **A** with all the outcomes of interest. 

3Blue1Brown's video on Bayes' theorem does a great job of visualizing how one can consider all the possible outcomes (in their example, the profession of a group of people) as a rectangle that can be broken down into overlapping sections from which Bayes' theorem can be derived. You can watch it [here](https://www.youtube.com/watch?v=HZGCoVF3YvM).

Applying this to the coin toss question, we can visualize all the possible heads and tails sequences ('HHHTTT', 'HTHTHT', 'HHHHHH', etc) one may get after tossing a coin six times with a similar visualization: a sample space. A sample space is a visualization of all the possible discrete outcomes or paths that may happen for a given experiment. In this example, coin toss sequences. 

![Sample Space for 6 Consecutive [Independent] Coin Tosses](/blog/assets/coin-sample-space-n-6.png "Coin Sample Space")
<details>
<summary>Show visualization code</summary>

<<< blog/assets/code/coin-sample-space-simple.py
</details>

The first block on the left shows the 0th coin flip. Since it has a guaranteed probability of happening, it occupies the whole Y-axis. The second block shows the outcome of the first coin toss. Since it can be either a head or a tail, it occupies two evenly spaced blocks. 

Further to the right, each block doubles in its number of outcomes, which makes sense intuitively because we're expanding each coin toss with 2 children outcomes respectively.

The Y-axis gives the probability for each single path to happen according to its proportion. Paths along the center — with an even variation between heads and tails — occupy a bigger part of the Y-axis, as naturally, they're the most probable, while paths of consecutive heads or tails (either going fully down or up, in a staircase pattern), occupy an ever-decreasing proportion of the Y-axis, relative to their very low probabilities as shown below.

![Consecutive tails or heads shaded staircase.](/blog/assets/coin-sample-space-shaded-staircase.png "Consecutive tails or heads shaded staircase.")

<details>
<summary>Show visualization code</summary>

<<< blog/assets/code/coin-sample-space-consecutive.py
</details>

Are you starting to see the link between geometry and probability here? You could measure the probability for any given sequence by picking its terminal block and measuring its height. It makes questions like how likely are you to get a specific sequence like 'HTHHTHH' easy to answer; just trace the graph!  

So why is this important? As you may recall from the law of large numbers, over enough runs, outcomes average out to their true probabilities. If you flip a fair coin forever and count how many times you get heads or tails, the chance of getting either becomes 50% and 50%. The above graph doesn't really make this intuitive, though. After all, it seems like the most likely sequences simply collapse into blobs of increasing length.

But something is hiding in plain sight: a normal distribution. If we plot the proportion of times we get heads in the sample space as shown below, there is a clear bell shape before the true 50% proportion converges. 

![Proportion of Heads in the Coin Sample Space Over N=0 to N=100](/blog/assets/coin-sample-space-proportion-heads.png "Proportion of Heads in the Coin Sample Space Over N=0 to N=100")

<details>
<summary>Show visualization code</summary>

<<< blog/assets/code/coin-sample-space-distribution.py
</details>


Now, we can see that the proportion will indeed even out to 50%, and if we expanded this to many more **N** we'd end up seeing a completely straight line. 

What's interesting is that at N < 20 the distribution of outcomes is mostly normal. The yellow lines act as a visual aid: if we stopped sampling proportions at those lines, the center would follow the central limit theorem, accumulating most outcomes and smoothing out to a bell. 

We can explain this intuitively by looking at the previous figure overlaid and mirrored on the sample space distribution plot: 

![Overlay of the two previous plots with the sample space mirrored on top of proportion sample space.](/blog/assets/coin-sample-space-overlay.png "Overlay of the two previous plots with the sample space mirrored on top of proportion sample space.")

<details>
<summary>Show visualization code</summary>

<<< blog/assets/code/coin-sample-space-overlay.py
</details>

The edges of the bell line up with consecutive coin paths, which are very unlikely, and correspondingly fall in its tails. The blob outcomes occupying **the biggest proportion** along the center correspondingly line up with the center of the bell, showing that the Central Limit Theorem emerges geometrically from the branching structure of a binomial sample space. Zooming out from the coin-toss example, this is applicable to any binomial process. 

Is this news? Perhaps not. But it is very cool to see how probability can be translated into areas and proportions, which can in turn reveal the underlying probability distribution for a specific outcome in a visual, geometric manner. 

I used Perplexity with Claude 4.5 Sonnet to work through my ideas. Originally, I began making the above graphs and experiments during class when I got carried away trying to solve a problem by drawing boxes, which led to me seeing the staircase pattern (in the context of rigged coins), and following the clearest patterns. It walked me through how this nicely ties up in a way math-minded readers will enjoy:

> What we've visualized here is actually a rotated form of Pascal's triangle—a well-established mathematical structure where each number is the sum of the two numbers above it. The connection runs deep: at each flip number N, counting how many paths lead to exactly k heads gives you the entries in row N of Pascal's triangle. These are the binomial coefficients C(N,k), which represent the number of ways to choose k items from N. When we divide each row by 2^N to convert counts into probabilities, we get the binomial distribution. The Central Limit Theorem then guarantees that as N grows large, this distribution approaches the normal curve—which is exactly what we see in our visualization. The geometry of branching paths through sample space doesn't just resemble Pascal's triangle; it is Pascal's triangle, revealing why the bell curve emerges so naturally from repeated binary trials.

I will have to research further the math-y bits, but it was cool to spend an evening chasing geometric intuition; I find it much better than swimming through formulas, personally.

If you found this useful or interesting, I'm glad! Do consider writing a technical blog of your own. In an AI-dominated era, mindful writing is more valuable than ever. It is also very useful to enrich your own understanding of things. 

<small>1. I promise I did not go out of my way to write this blog post just to show the visualization of the proportion of heads. It is extremely cool.</small>