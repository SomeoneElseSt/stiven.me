I have read many technical blogs that clarified my understanding of some topics in the past. Some notable shoutouts are [this](https://colah.github.io/posts/2015-09-Visual-Information/) visual information theory breakdown, and [this](https://logan-thomas.com/2021/01/23/maxwell-demon/) post on Maxwell's Demons. They are both very throughrough and I recommend you read them.

I think technical blogs are an essential source of knowledge, because in order for someone to write them, they need to understand deeply (and empirically) whatever they're trying to explain to you. Plus, they are also written in a way that you're supposed to understand, unlike papers. I encourage you to write one of your own!


This brief write-up is my first attempt to contribute back by illustrating some interesting geometrical properties of binomial events I found through a statistics class I'm taking this semester. 

Picture a fair headed coin. There are two outcomes to this coin: heads or tails, each with a 50% chance, ceteris paribus. 

If you wanted to know what are the chances that this coin lands on heads **N** times consecutively, you can use the formula for conditional probability:

$$
P(A \mid B) = \frac{P(A \cap B)}{P(B)}
$$

Where $A \cap B$ is the likelihood of both events happening together, and $P(B)$ is the chance of that single event happening, i.e., a coin toss falling in heads.

If the coin is fair and coin tosses do not influence each other, the probability of getting heads $N$ times in a row is:

$$
P(\text{heads } N \text{ times}) = \left(\frac{1}{2}\right)^N
$$

Now, you probably already know these formulas if you took a probability class in college or high-school. 

What you might not know is that probability is, fundamentally, a language for the describing specific geometrical overlaps of a set **A** with all the outcomes of interest. 

3Blue1Brown's video on Bayes theorem does a great job of visualizing how one can consider all the possible outcomes (in their example, the profession of a group of people) as a rectangle that can be broken down into overlapping sections from which Bayes theorem can be derived. You can watch it [here](https://www.youtube.com/watch?v=HZGCoVF3YvM).

Applying this to the coin toss question, we can visualize all the possible head and tails sequences ('HHHTTT', 'HTHTHT', 'HHHHHH', etc) one may get after tossing a coin six times with a similar visualization: a sample space. A sample space is a visualization of all the possible discrete outcomes or paths that may happen for a given experiment. In our example, the coin toss. 

![Sample Space for 6 Consecutive [Independent] Coin Tosses](/blog/assets/coin-sample-space-n-6.png "Coin Sample Space")
<details>
<summary>Show visualization code</summary>

```python
import matplotlib.pyplot as plt
import numpy as np

num_flips = 6  # Visualize 6 flips

fig, ax = plt.subplots(figsize=(14, 8), facecolor='black')
ax.set_facecolor('black')

colors = plt.cm.Blues(np.linspace(0.3, 0.9, num_flips + 1))

for flip in range(num_flips + 1):
    total_outcomes = 2**flip
    height = 1 / total_outcomes
    
    # Draw all possible outcomes at this level
    for outcome in range(total_outcomes):
        y_position = outcome * height
        
        rect = plt.Rectangle((flip, y_position), 0.8, height, 
                            linewidth=1, edgecolor='black', 
                            facecolor=colors[flip], alpha=0.7)
        ax.add_patch(rect)
        
        if flip <= 5:  # Label first few
            ax.text(flip + 0.4, y_position + height/2, f'{outcome}', 
                   ha='center', va='center', fontsize=8)

ax.set_xlim(-0.5, num_flips + 0.5)
ax.set_ylim(0, 1)
ax.set_xlabel('Coin Flip Number', fontsize=12, color='white')
ax.set_ylabel('Probability space (0–1)', fontsize=12, color='white')
ax.set_title(f'Sample Space Division: {num_flips} Coin Flips\n(Total outcomes = 2^{num_flips} = {2**num_flips})', fontsize=14, color='white')
ax.set_xticks(range(num_flips + 1))
ax.grid(axis='x', alpha=0.3, color='white')

ax.tick_params(colors='white')
for spine in ax.spines.values():
    spine.set_color('white')

plt.tight_layout()
plt.savefig('sample_space_tree.png', dpi=150)
plt.show()

```
</details>

The first block on the left shows the 0-th coin flip. Since it has a guaranteed probability of happening, it occupies the whole Y-axis. The second block shows the outcome of the first coin toss. Since it can be either a head or a tail, it occupies two evenly spaced blocks. 

Rightmost, each block doubles in its number of outcomes, which makes sense intuitively because we're expanding each coin toss with 2 children outcomes respectively.

The Y-axis gives the probability for each single path to happen according to its proportion. Paths along the center — with an even variation between heads and tails — occupy a bigger part of the Y-axis, as naturally, they're the most probable, while paths of consecutive heads or tails (either going fully down or up, in a staircase pattern), occupy an ever-decreasing proportion of the Y-axis, respective to their very low probabilities. 

Are you starting to see the link between geometry and probability here? You could measure the probabily for any given sequence by picking its terminal block and measuring its height. It also makes questions like how likely is it to get tails if you've gotten heads three consecutive times much easier to answer; just trace the graph! 

So why is this important? As you may recall from the law of large numbers, over enough runs, outcomes average out to their true probabilities. If you flip a fair coin forever and count how many times you get heads or tails, both are bound to be 50/50. The above graph doesn't really make this intuitive, though. After all, it seems sequences simply collapse into blobs of increasing lenght.

But something is hidding there in plain sight. A normal distribution. The below figure of the probability of getting heads from N=0 to N=100 coin tosses shows 1) the natural emergence of a normal distribution at the earliest **N** counts, where outcomes are spread according to ??? and 2) the expected convergence by the law of large numbers to a 50% chance of 









