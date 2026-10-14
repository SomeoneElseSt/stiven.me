During spring of freshman year, I commuted twice every week from San Francisco to Berkeley so I could sit in on ECON 100A, Berkeley's microeconomics course. A friend had invited me to visit and left me in one of the halls for a while. I thought I wanted to do economics at the time, so I was glad to find out one of the lectures in that hall was 100A and decided to drop in while it was running[^1].

Ironically, the more I studied economics, the more skeptical I felt about it as a social science. I found its theories too constrained and limited by impractical assumptions.

Nevertheless, it was a fun subject to study. I have hundreds of notes I took on an oversized drawing tablet that must've looked the silliest set-up of anyone in the hall. 

<a id="dwl-primer"></a>

My favorite concept I took away from the class is deadweight loss, or DWL for brevity. Skip this section if you're already familiar ([click here](#after-dwl)). 

Imagine you have a seller - say, a business - and many buyers that want to buy a good from that seller. We assume the seller wants to earn the largest amount of money possible and there are many buyers that can each afford the product at a different price point. 

How does that good get priced? Some buyers might be willing to pay more for it than others, so the seller could set prices high. This seems reasonable, but if 8 buyers were able to pay $12 each while 2 were able to pay $40, setting the price of the good to $40 is a *net* loss at $80, as pricing it at $12 would net $96, leaving a $16+ difference on the table. Not to mention the social effects making the good available to more people might have[^2]. 

Let's formalize this: 
- The seller can price the good at any price in the range 1-100. This is called the *supply curve*.
- Some number of buyers can afford the good at a given price. This is called the *demand curve*. We'll consider 10 buyers total, each able to afford it at a different price.

We can plot these curves against each other. This will be helpful for finding the optimal price a seller should sell their product at. 

![Supply and demand curves plotted as price against quantity.](/blog/assets/figures/en/supply-demand-curves.png "Supply and Demand Curves")

All 10 people can afford a unit of the good when the price is zero. Yet the seller can't offer it for less than $10 (this may be their break-even price). Should they price it high or low?

The optimal price lies in the intersection of the two curves. Intuitively, it's the maximum number of units the seller can sell at the highest price. Five units at $50 each nets $250. Much higher than the $160 from selling two units at $80, and higher than selling a lot of units at $20, also totalling $160. We can visualize this. 

![Supply and demand curves with the equilibrium and two alternative price points marked.](/blog/assets/figures/en/supply-demand-equilibrium.png "Equilibrium and Alternative Price Points")

This is the scenario with the *most given* for the *most paid*, and is called a state of equilibrium. We can now talk about DWL. 

DWL is the profit the seller could've made had they priced their product closer to equilibrium when the product is too expensive or cheap. 

We visualize it as the area between the corners of 1) the equilibrium point, 2) the point at the demand curve the good was priced at, and 3) the point on the supply curve parallel to the price on the demand curve, forming a triangle. Let's visualize it for when the good is sold at $80. 

![Deadweight loss triangle between the supply and demand curves when the good is sold at $80.](/blog/assets/figures/en/supply-demand-dwl.png "Deadweight Loss at a Price of $80")

The area of the triangle represents goods the seller could've sold had they priced their product closer to equilibrium, letting them net a higher profit. 

DWL on the right side of the graph is profit the seller is missing out on due to pricing the good too low. It's when consumers are benefiting at the cost of money the business could be making if the good was priced higher.

![Deadweight loss triangle between the supply and demand curves when the good is sold at $20.](/blog/assets/figures/en/supply-demand-dwl-low-price.png "Deadweight Loss at a Price of $20")

Congrats! You now know some undergraduate microeconomics. Try asking: "Why doesn't Apple price their old stock lower given it's worth less and some people might still buy it? Doesn't that minimize DWL?" and realize the real world isn't as simple and interpretable as this model[^3].

<a id="after-dwl"></a>

Ok, so why am I writing about DWL? (Skipped ahead? [Go back](#dwl-primer).) I see some parallels between ideas in the study of DWL and the current paradigms of coding agents. 

I work extensively with coding agents. Almost every day I'm prompting, reviewing code, etc[^4]. 

I've observed an inverse relationship between the skill needed by a human to accomplish a task and how good a model is. 

When working with a frontier model, it's generally sufficient to ask for what you want. "Fix this bug", "Add X feature", etc. On the other hand, small models need long, hyper-specific prompts. Otherwise they are inaccurate, miss your intent, or lose track of the task after some time. 

In other words: when a model is bad/limited at a task, humans supplement its deficiency with their own skills and steering. 

This is currently true for any task that frontier models aren't good at or when using small models. It's part of why open-weight models aren't as big of a threat as they may seem in cybersecurity and biology. You still need knowledgeable humans to get the most out of them, at least for now.  

This relationship also means unskilled workers can use powerful models to do work that previously required extensive training and experience.

[This](https://cendyne.dev/posts/2026-10-11-fable-took-my-jorb.html) blog post by a developer laid off due to AI describes how their company chose to do layoffs because *"AI assistance raised the capability of work for the less passionate, less experienced, and less costly workforce"*. 

This isn't a new phenomenon. It's similar to how sewing machinery made jobs traditionally done by hand accessible to anyone anywhere who knew how to operate it, permitting offshoring in the '60s. 

It's the reason why hiring for engineering jobs is shifting from being technically focused to highlighting traditionally undervalued skills, as I discuss toward the end of the post.

We can map this relationship onto the first graph if we swap the Demand curve with Human effort and the Supply curve with Model cost. I assume more capable models are more expensive[^5].

The x-axis represents how capable a model is relative to the task: at the left, the model is too weak for it and cheap. At the right, it's overkill and expensive. The y-axis represents what you pay. The height of the human effort line is how much steering effort the model needs from you, as the height of the model line is what the model costs. The more capable the model, the less steering it needs and the more it costs.  

![Human effort and model cost plotted against how capable the model is relative to the task.](/blog/assets/figures/en/human-model-curves.png "Human Effort and Model Cost")

A simple example to illustrate DWL in this graph is when frontier models are used for trivial work that a smaller model could do. E.g., changing the text on a page or running trivial git commands (when was the last time you prompted 'yes, push it'?). 

![Deadweight loss on the right side of the human effort and model cost graph, where a frontier model is used for a trivial task.](/blog/assets/figures/en/human-model-overreliance.png "Deadweight Loss From an Overpowered Model")

The economic argument against this is obvious: you're using frontier tokens for trivial tasks. Ideally, you'd want to save the cost.

The practical argument is that if token spend wasn't a concern, it would probably be faster if you used a smaller model. Like if Cursor's Composer did it in 6 seconds rather than have Astra think for 60. 

Even if your smart model was ultra fast, that is very expensive right now, so the economic argument still holds: others *could* do the same thing just as fast for cheaper if we had the systems to transfer context efficiently and on the spot. You would be burning money unnecessarily. 

I see this mattering in the short to medium term but not long term. 

In the short to medium term, AI is expensive enough to warrant optimizing model choice. This will be especially salient for AI-native companies if the token subsidies stop[^6]. Engineers might get token budgets on top of their salary, as Jensen Huang [pointed out](https://www.cnbc.com/2026/03/20/nvidia-ai-agents-tokens-human-workers-engineer-jobs-unemployment-jensen-huang.html).

Long-term, I expect frontier intelligence to become too cheap to meter and very fast. I call this a 'terminal' class of models. Swiss Army knives that work well for 90% of tasks, are near free to run (likeliest because they would use your phone or computer) and fast. The remaining 10% won't be tasks the model can't do, but tasks we wouldn't let it do alone, like aligning itself or controlling nuclear weapons. These fields will still need humans.

Empirically, we've seen progress in this direction when labs release smaller versions of their frontier models (Fable from Mythos, GPT 6.1 Sol from Astra) that are similarly capable for cheaper[^7]. 

For now, frontier models will remain in use for simple tasks because they are generally more reliable and not priced to their true cost. There is no incentive to find equally good and cheaper (perhaps deterministic?) alternatives. We might not need to if the token subsidies last until we reach terminal models.

What about DWL on the left side of the graph?

I was recently experimenting with the Qwen family of models, running them locally on my computer with Ollama. It was disappointing. They know a lot and can pull off impressive tricks for a small model, but as soon as you throw a real task at them, they blow their context budgets overthinking unnecessary details.

![Deadweight loss on the left side of the human effort and model cost graph, where a small model needs heavy human guidance.](/blog/assets/figures/en/human-model-underreliance.png "Deadweight Loss From an Underpowered Model")

I could only get it to do what I wanted by pointing out the exact lines of code it had to look at. I even had to change some code by hand because even though I'd tell it many times in a row to execute the change, it just thought, and thought, until its context overflowed. 

It also took me considerably longer to finish my project with Qwen because it needed so much handholding. I knew frontier models would've done the task with a single prompt. My mental load was heavier too: it is so much simpler to prompt your way through with a frontier model. You don't really need to think[^8]. 

Though, in my case, I used a small model for the sake of experimentation. In the real world, DWL on the left is visible on tasks that the models aren't good at *yet*. Like the odd finance and ML research benchmarks, or some computer use tasks. You still need people reviewing the models' outputs and steering them.

If accuracy can be quantified and the task is economically valuable, it will be conquered eventually, likeliest first at the frontier, shifting to the right. This is true of tasks where labs and startups have an interest in introducing automation. It's part of the diffusion process. 

The point of equilibrium is the model with the best price and right level of intelligence for a task. It obtains the same outcome a frontier model would because it's just as capable for that task, except it's cheaper and possibly faster. The human effort you save beyond the point of equilibrium is currently paid for by token subsidies and would otherwise be costly.

You get to equilibrium by using a smaller model for the task that's known to be capable, or making your own through custom datasets and evaluations if one doesn't exist yet. This is a fixed but expensive and time-consuming cost. 

![Equilibrium between human effort and model cost, where the model is just right for the task.](/blog/assets/figures/en/human-model-equilibrium.png "Equilibrium Between Human Effort and Model Cost")

Until we achieve terminal models, equilibrium-optimized model harnesses, model routers, and training environments will be useful as token usage grows across the economy. Or indefinitely if governments introduce regulation that stalls the development of a terminal model and we settle into a status quo.

They will make most tasks near free, fast, runnable on edge hardware[^9], and routable to the cloud when necessary, at the cost of human effort. I see three technical challenges in the way:

- Transferring context: choosing the right model to transfer context to and doing so at as close to zero cost and latency as possible. This matters for individual tasks and threads, e.g., in model harnesses and routers.
- Parallelism: how to maximize GPU utilization and KV Cache / model weights offloading and reloading speed so every watt of compute available to infrastructure providers is utilized 24/7.
- Model Profiling: easy-to-use tools anyone can use to find an already-capable model for a task or to train one, i.e., to get to equilibrium.

Budget-conscious, technically able organizations like Ramp are already trying their hand at these problems, making custom environments to [RL small models](https://x.com/RampLabs/status/2052447438795833506) on and building their own [model router](https://router.com).

But to diffuse AI into the wider economy at its current price, much work needs to be done on simple-to-use optimizers that small and medium-sized organizations can use to save on their token spend, both for individuals within an organization and for specific tasks. 

Jev might be very cheap but your average store clerk or non-profit worker isn't gonna get an API key and make an eval to see if it beats Astra at their classification task. They'd rather press a button or ask their agent and see results to choose from. Ideally they learn from their agent proactively that a better option is available.

I reckon model providers might be the first to arrive at a solution. It would be neat if Claude Code automatically switched models when my asks were simple (though in practice this isn't more efficient yet due to caching), like how automatic cars shift gears at the right time for you.

Altogether, the graph paints a familiar story: the frontier will lay the groundwork for the toughest challenges while diffusion makes them economically viable and accessible[^10]. 

Thinking through this made me conclude there are two paths for the future of work:
- Skills that cannot be optimized against (yet) will become increasingly valuable. E.g., interpersonal communication, relationship building.
- If we do optimize everything optimizable (though I expect this to take a long time), we'll make different problems for ourselves that 
require skills outside the scope of optimization (see [this](https://asteriskmag.com/issues/15/after-work-we-ll-have-each-other) essay).

In either case, we'll be better off from it. It will provide healthcare and improved quality of life for millions of underprivileged people, enable massive social mobility - the works. That is, if we align it. 

What about work that is not part of the graph? That is, work that doesn't have a "right" result, such as the arts, and work that is completely new and doesn't have a point of comparison to define right from, e.g., new products and media.

If the model can do anything you ask[^11], "right" in a creative pursuit is entirely up to you. The model is perfectly matched to what you want it to do, so only you will know where to stop (assuming the model is terminal).

To illustrate this: had French sculptor Auguste Rodin had access to a machine that could sculpt anything he wanted, he would've still spent a large amount of time tweaking his pieces and dialing in what they're meant to convey. Each is characterized by what the author was going through at the time, or the way he *chose* to portray other people.

Rodin's *Monument to Balzac* is a good example. 

![Detail of Auguste Rodin's Final Study for the Monument to Balzac: a bronze figure wrapped in a heavy cloak, head thrown back.](/blog/assets/monument-to-balzac-the-met.jpg "Auguste Rodin, Final Study for the Monument to Balzac. The Metropolitan Museum of Art.")

When Rodin set out to make a monument for Balzac, a prominent French writer, he stated "a man celebrated for his heart and mind should not be [represented by] his body" (see [reference](https://www.metmuseum.org/art/collection/search/207498)). We see this in the sculpture, it being far from idealized or beautified in its texture, contours, and the undefined shape of Balzac's face. 

This makes the sculpture iconic. It makes one wonder why the author chose to portray him like that. Other sculptors might've chosen to highlight him heroically or in a more grandiose way, but that wasn't Rodin. 

In other words: the process of making the piece and the choices taken by the author are the work. The end result is a reflection of that. Now that much of the process of creation of software and digital media has been commodified, intentional choices will differentiate works from each other. 

For example, Wall-E is beautiful yet dystopic, dire yet hopeful, emotional yet solemn. You could prompt a terminal model, "make a movie that's beautiful yet dystopic, dire yet hopeful, and emotional yet solemn", and it will make many movies but not Wall-E exactly. 

Making Wall-E - differentiated work broadly - can't be done descriptively. To make Wall-E without knowing about it, you would have to walk the same choices as its authors. But how? Your motivations, environment, and thoughts are different.

It's extremely unlikely you would. Works of art are unique because they stem from individuals with distinct life stories, preferences, and memories. 

I believe a post-scarcity world will be defined by this individuality.

It's already here, partially. The code to display this blog as I envisioned it would have been considerably harder to make without LLMs. 

None of this is to say AI isn't already making beautiful art and meaningful work. It is to say that post-scarcity humans will lean toward appreciating a piece of work more for the person behind it and their motives than the end result. If we anthropomorphize AI (e.g. by giving them bodies, identities, and the same treatment as humans), "person" might mean humanoid too.

Using AI to create also means it will indirectly dilute our creative choices, as with any tool that does some of the steps for you. Unique motivations, inspiration, and goals will therefore be most important. Like me learning about DWL and seeing parallels to model capabilities and human effort. 

I also don't think we'll optimize generative creative work against brain responses (e.g. using Meta's [TRIBE v2](https://ai.meta.com/blog/tribe-v2-brain-predictive-foundation-model/), a model that predicts fMRI brain activity in response to media) because dopamine is most meaningful with struggle. I think we'd get bored. Like how eating too much ice cream makes you not want to eat it for a long time. Though, there are scenarios where we optimize the struggle-to-dopamine loop that could be catastrophic[^12]. 

Our new struggle will be acquiring inspiration, living unique lives, and making ever-more creative works. Or so I hope.

As a closing note, I think more economists should be looking at AI and more computer scientists looking at economics. Economists may find that some concepts map well to AI, as I tried to map DWL. Computer scientists can use analogous thinking from economics to better understand the direction of the field.

For example: the DWL triangle's area grows much faster the further you get from equilibrium. This means there is a small amount of loss if you over/undershoot the equilibrium by a bit, and a huge one if you're at either extreme. 

Someone building a model router might choose to accept some error away from equilibrium because the loss nearby is small, and instead optimize for avoiding the worst offenders (like having Fable do git push). This is a helpful mental frame I myself didn't know - Claude told me when I asked it for some ways DWL is analyzed that could connect to the post.

You'd have needed an economist that's into AI or a computer scientist that reads up on economics to connect the dots. Also, I didn't talk about the complex calculus and algebra that go into minimizing DWL for complex supply and demand curves. Some might be transferable to compute allocation. Go read!

[^1]: The hall was usually half-empty, so I figured it would minimize deadweight loss (pun intended) to sit quietly and watch the lectures. 

[^2]: Ideally, each customer would be charged the maximum they can pay. This is referred to as first degree pricing. But often sellers don't know what that maximum price is, and instead offer many options at different tiers (e.g. 1st class, premium economy, economy) so the buyer chooses for themselves. This is referred to as second degree pricing. Third degree pricing forces customers to segment by making the quality gap between the options large or enforcing tiers (e.g. student discounts). They all aim to extract as much of what the customer can pay for a good from them, which is referred to as their surplus.

[^3]: Though, it follows similar rules. If you study economics further, I encourage you to learn about the concept of the "invisible hand". TLDR: markets minimize DWL on their own because inefficient arrangements will get outcompeted or outpriced by a competitor. 

[^4]: 1 Billion tokens a day keeps the doctor away.  

[^5]: When I write "cost," I'm talking about the compute needed to run an instance of a model. Bigger models are generally better and require more compute to run. I call it "cost" in the blog because it's what we ultimately deal with. Do note that compute and monetary cost will map one-to-one when the labs stop subsidizing tokens. The plots assume they map one-to-one. When the subsidies stop, I expect the rug pull to be similar to what happened when ridesharing apps stopped subsidizing rides and the true price was passed on to consumers. People will be more selective about when they choose to use the service and supplement it with their own skills and cheaper alternatives.

[^6]: How many startups would be scrambling if the labs took away token subsidies today? Seriously. I was spending 6 figures in tokens at a previous startup (in API costs) every month. Had those been billed, it would've been like getting my salary paid twice! For a small startup this might be OK, but at the scale of large companies or AI-native organizations, this'd be a huge financing issue. Ajeya Cotra talked about this [here](https://www.youtube.com/watch?v=Z19UEZHJzAg). In the future, some money will be directed towards buying API credits or GPUs instead of paying humans because intelligence will be cheaper and faster.

[^7]: Though the scaling laws - especially test-time compute scaling - would suggest existing architectures won't suffice to reach a terminal model, because they trade off speed for intelligence.

[^8]: As Naval [said](https://www.youtube.com/shorts/x-P119dx8xM): 'waste tokens to save time'.

[^9]: Some early glimpses of inference at the edge are starting to show, as Anthropic detailed in [this](https://www.anthropic.com/research/self-replicating-ai) recent report. I expect phones and laptops to do most inference within this decade.

[^10]: This pattern actually repeats through much of history, like how facial reconstruction was invented to treat scarred soldiers during WWI or how Tesla began by selling a luxury car, then funneling down to average consumers. New, good technologies are developed at great cost, often for a very small number of users, to later become mainstream.

[^11]: This is already true in some domains, just not effortless yet.

[^12]: Sports and video games already optimize the cycle of struggle then dopamine. They share in common that, usually, they're multiplayer experiences. I expect AI-enabled experiences will be too. What would be terribly detrimental is if they replace human connection with connection to AIs. I.e., if people can supplant human interaction with machine interaction. Countries where this is [already happening](https://www.bbc.com/news/magazine-24614830) have the worst replacement rates in the world. It threatens the fabric that made human society last. For the same reason, we might benefit as a species from having small clusters of people who do not use AI or technology. They would carry on if most humans become isolated and warn about the dangers of anthropomorphization.