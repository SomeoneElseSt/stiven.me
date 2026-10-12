I attended an economics class in Berkeley during my freshman year in San Francisco. A friend studying there invited me to go visit. He had to do something through the afternoon and left me in one of the halls. At the time I thought I wanted to do economics, so I was glad to find out one of the lectures in that hall was Berkeley's microeconomics course, ECON 100A, and decided to attend it during the Spring.

Ironically, the more I studied economics, the more skeptical I felt about it as a social science. I found it too constrained by theory and unreasonable assumptions. 

It was nevertheless a fun subject to study. I have hundreds of pages from notes I would take on an oversized drawing tablet plugged into my computer that must've looked the silliest set-up of anyone in the hall. 

My favorite concept I learned in that class is dead-weight loss, or DWL for brevity. Feel free to skip this section if you're already familiarized ([click here](#after-dwl)). 

Imagine you have a seller - say, a business - and many buyers that want to buy a good from that seller. We assume the seller wants to earn the most amount of money possible and buyers want to acquire as many units of the good as possible. 

How does that good get priced? Some buyers might be willing to pay more for it than others, so the seller sets prices high. This seems reasonable, but if 8 buyers were able to pay $12 each while 2 were able to pay $40, setting the price of the good to $40 is a *net* loss at $80, as pricing it at $12 would net $96, leaving a $16+ difference on the table. Not to mention the social effects making the good available to more people might have[^1]. 

Let's formalize this: 
- In this example, the seller can price the good at any price in the range 1-100. This is called the *supply curve*.
- Some number of buyers can afford the good at a given price within the range. This is called the *demand curve*. For our example, we'll consider 10 buyers total, each able to afford it at a different price.

We can plot each of these curves against each other. This will be helpful for finding what is the optimal price a seller should sell their product at. 

![Supply and demand curves plotted as price against quantity.](/blog/assets/figures/en/supply-demand-curves.png "Supply and Demand Curves")

We see all 10 people can afford a unit of the good when the price is zero. Yet the seller can't offer it for less than $10 (this may be their break-even price). Perhaps they can offer the good at $80 for the two people who can afford it. What should they do?

The optimal price to quantity ratio lies in the intersection of the two curves. Intuitively, it's the maximum number of units the seller can sell at the highest price. Five units at $50 each nets $250. Much higher than the $160 from selling two units at $80, and higher than selling a lot of units at $20, also totalling $160. We can visualize this. 

![Supply and demand curves with the equilibrium and two alternative price points marked.](/blog/assets/figures/en/supply-demand-equilibrium.png "Equilibrium and Alternative Price Points")

This is the scenario with *the most given for the most paid*, and is called a state of equilibrium. We can now talk about dead-weight loss (DWL). 

Conceptually, DWL is the profit the seller could've made had they priced their product closer to equilibrium when the product is too expensive or cheap. 

We visualize it as the area occupied between the corners of 1) the equilibrium point, 2) the point at the demand curve the good was priced at, and 3) the point on the supply curve at the same quantity. 2 and 3 are parallel to each other, making DWL look like a triangle. Let's visualize it for when the good is sold at $80. 

![Deadweight loss triangle between the supply and demand curves when the good is sold at $80.](/blog/assets/figures/en/supply-demand-dwl.png "Deadweight Loss at a Price of $80")

The area in the triangle - the gap between the demand curve and the supply curve - represents goods the seller could've sold had they priced their product closer to equilibrium, letting them net a higher profit. 

DWL on the other side of the graph is profit the seller is losing due to pricing the good at too low of a price. It's sometimes referred to as philanthropy - ok, no, but you get the idea. It's when consumers are benefiting at the cost of money the business could've kept for itself.

![Deadweight loss triangle between the supply and demand curves when the good is sold at $20.](/blog/assets/figures/en/supply-demand-dwl-low-price.png "Deadweight Loss at a Price of $20")

Congrats! You now know some undergraduate microeconomics. You can now ask: "Why doesn't Apple price their old stock lower given it's worth less and some people might still buy it?" and realize the real world isn't as simple and interpretable as this model[^2].

<a id="after-dwl"></a>

I chose to write this because I realized there are 


[^1]: Ideally, each customer would be charged the maximum they can pay. This is referred to as first degree pricing. But often sellers don't know what that maximum price is, and instead offer many options at different tiers (ex. 1st class, premium economy, economy) so the buyer chooses for themselves. This is referred to as second degree pricing. Third degree pricing forces customers to segment by making the quality gap between the options large or enforcing tiers (ex. student discounts). They all aim to extract as much of what the customer can pay for a good from them, which is referred to as their surplus.

[^2]: Though, it follows very similar rules. If you study economics further, I encourage you to learn about the concept of the "invisible hand". TLDR: markets minimize DWL on their own because inefficient arrangements will get outcompeted or outpriced by an incumbent. But I won't spoil it for you. Go read! 

