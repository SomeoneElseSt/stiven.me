I attended an economics class in Berkeley during freshman year. A friend studying there invited me to visit. He had to do something for a while and left me in one of the halls. At the time, I thought I wanted to do economics, so I was glad to find out one of the lectures in that hall was Berkeley's microeconomics course, ECON 100A, and decided to attend it during the Spring.

Ironically, the more I studied economics, the more skeptical I felt about it as a social science. I found its theories too constrained and limited by impractical assumptions.

Nevertheless, it was a fun subject to study. I have hundreds of notes I took on an oversized drawing tablet that must've looked the silliest set-up of anyone in the hall. 

My favorite concept I learned in that class is deadweight loss, or DWL for brevity. Skip this section if you're already familiarized ([click here](#after-dwl)). 

Imagine you have a seller - say, a business - and many buyers that want to buy a good from that seller. We assume the seller wants to earn the largest amount of money possible and there are many buyers that can each afford the product at a different price point. 

How does that good get priced? Some buyers might be willing to pay more for it than others, so the seller could set prices high. This seems reasonable, but if 8 buyers were able to pay $12 each while 2 were able to pay $40, setting the price of the good to $40 is a *net* loss at $80, as pricing it at $12 would net $96, leaving a $16+ difference on the table. Not to mention the social effects making the good available to more people might have[^1]. 

Let's formalize this: 
- The seller can price the good at any price in the range 1-100. This is called the *supply curve*.
- Some number of buyers can afford the good at a given price. This is called the *demand curve*. We'll consider 10 buyers total, each able to afford it at a different price.

We can plot these curves against each other. This will be helpful for finding the optimal price a seller should sell their product at. 

![Supply and demand curves plotted as price against quantity.](/blog/assets/figures/en/supply-demand-curves.png "Supply and Demand Curves")

All 10 people can afford a unit of the good when the price is zero. Yet the seller can't offer it for less than $10 (this may be their break-even price). Should they price high or low?

The optimal price lies in the intersection of the two curves. Intuitively, it's the maximum number of units the seller can sell at the highest price. Five units at $50 each nets $250. Much higher than the $160 from selling two units at $80, and higher than selling a lot of units at $20, also totalling $160. We can visualize this. 

![Supply and demand curves with the equilibrium and two alternative price points marked.](/blog/assets/figures/en/supply-demand-equilibrium.png "Equilibrium and Alternative Price Points")

This is the scenario with the *most given* for the *most paid*, and is called a state of equilibrium. We can now talk about deadweight loss (DWL). 

DWL is the profit the seller could've made had they priced their product closer to equilibrium when the product is too expensive or cheap. 

We visualize it as the area between the corners of 1) the equilibrium point, 2) the point at the demand curve the good was priced at, and 3) the point on the supply curve parallel to the price on the demand curve, forming a triangle. Let's visualize it for when the good is sold at $80. 

![Deadweight loss triangle between the supply and demand curves when the good is sold at $80.](/blog/assets/figures/en/supply-demand-dwl.png "Deadweight Loss at a Price of $80")

The area of the triangle represents goods the seller could've sold had they priced their product closer to equilibrium, letting them net a higher profit. 

DWL on the other side of the graph is profit the seller is missing out on due to pricing the good too low. It's sometimes referred to as philanthropy - ok, no, but you get the idea. It's when consumers are benefiting at the cost of money the business could be making if the good was priced higher.

![Deadweight loss triangle between the supply and demand curves when the good is sold at $20.](/blog/assets/figures/en/supply-demand-dwl-low-price.png "Deadweight Loss at a Price of $20")

Congrats! You now know some undergraduate microeconomics. Try asking: "Why doesn't Apple price their old stock lower given it's worth less and some people might still buy it? Doesn't that minimize DWL?" and realize the real world isn't as simple and interpretable as this model[^2].

<a id="after-dwl"></a>

Ok, so why am I writing about DWL? I see some parallels between ideas in DWL Minimization (the use of calculus to find points of equilibria for different supply and demand curves) and the current paradigms of coding agents. 

I work extensively with coding agents. Almost every day I'm prompting, reviewing code, etc[^3]. 

I've observed an inverse relationship between the skill needed by a human to accomplish a task and how good a model is. 

When working with a frontier model, it's generally sufficient to ask for what you want. "Fix this bug", "Add X feature", etc. On the other hand, small models need long, hyper-specific prompts. Otherwise they are inaccurate, miss your intent, or lose track of the task after some time. 

In other words: when a model is bad/limited at a task, humans supplement its deficiency with their own skills and steering. 

This is currently true for any task that frontier models aren't good at or when using small models. It's part of why open-weight models aren't as big of a threat as they may seem in cybersecurity and biology. You still need knowledgeable humans to get the most out of them, at least for now.  

This relationship also means less-skilled individuals can use the models to do work that previously required extensive training and experience, in the cases where human input is minimal or closer to supervision than steering. 

[This](https://cendyne.dev/posts/2026-10-11-fable-took-my-jorb.html) blog post by a developer laid off due to AI describes how their company chose to do layoffs because *"AI assistance raised the capability of work for the less passionate, less experienced, and less costly workforce"*. 

This isn't a new phenomenon. It's similar to how sewing machinery made jobs traditionally done by hand accessible to anyone anywhere who knew how to operate it, permitting offshoring in the '60s. 

It's the reason why hiring for engineering jobs is shifting from being technically focused to highlighting traditionally undervalued skills, as I discuss toward the end of the post.

We can map these concepts onto the first graph if we swap the Demand curve with Human steering and the Supply curve with Model cost. I assume more capable models are more expensive.

When I write "cost," I'm talking about the compute needed to run an instance of a model. Bigger models are generally better and require more compute to run. 

I'll call it "cost" in the blog because it's what we ultimately deal with. Do note that compute and monetary cost will map one-to-one when the labs stop subsidizing tokens[^4]. The plots assume they map one-to-one. 

The x-axis represents how capable a model is relative to the task: at the left, the model is too weak for it and cheap. At the right, it's overkill and expensive. The y-axis represents what you pay. The height of the human line is how much steering the model needs from you, as the height of the model line is what the model costs. The more capable the model, the less steering it needs and the more it costs.  

![Human steering and model cost plotted against how capable the model is relative to the task.](/blog/assets/figures/en/human-model-curves.png "Human Steering and Model Cost")

A simple example to illustrate DWL in this graph is when frontier models are used for trivial work that a smaller model could do. E.g., changing the text on a page or running trivial git commands (when was the last time you prompted 'yes, push it'?). 

![Deadweight loss on the right side of the human steering and model cost graph, where a frontier model is used for a trivial task.](/blog/assets/figures/en/human-model-overreliance.png "Deadweight Loss From an Overpowered Model")

The economic argument against this is obvious: you're using frontier tokens for trivial tasks. Ideally, you'd want to save the cost.

The practical argument is that if token spend wasn't a concern, it would probably be faster if you used a smaller model. Like if Cursor's Composer did it in 10 seconds rather than have Astra think for a minute. 

Even if your smart model was ultra fast, that is very expensive right now, so the economic argument still holds: others *could* do the same thing just as fast for cheaper if we had the systems to transfer context efficiently and on the spot. 

I see this mattering in the short to medium term but not long term. 

In the short to medium term, a system to auto-route prompts and tasks will become valuable to save unnecessary spending and time, especially if the token subsidies stop. Both for people using AI and systems within companies that are heavily token-subsidized[^5]. 

Long-term, I expect frontier intelligence to become too cheap to meter and very fast. I call this a 'terminal' class of models. Swiss Army knives that work well for >= 90% of tasks and are near free to run (likeliest because they would use your phone or computer). The remaining 10% won't be tasks the model can't do, but tasks we wouldn't let it do alone, like aligning itself or controlling nuclear weapons. These fields will still need humans.

Empirically, we've seen progress in this direction when labs release smaller versions of their frontier models (Fable from Mythos, GPT 6.1 Sol from Astra) that are similarly capable for cheaper[^6]. 

What about DWL on the left side of the graph?

I was recently experimenting with the Qwen family of models, running them locally on my computer with Ollama. It was disappointing. They know a lot and can pull off impressive tricks for a small model, but as soon as you throw a real task at them, they blow their context budgets overthinking unnecessary details.

![Deadweight loss on the left side of the human steering and model cost graph, where a small model needs heavy human guidance.](/blog/assets/figures/en/human-model-underreliance.png "Deadweight Loss From an Underpowered Model")

I could only get them to do what I wanted by pointing out the exact lines of code they had to look at. I even had to change some code by hand because even though I'd tell them five times in a row to execute the change, it just thought, and thought, until its context overflowed. 

It also took me considerably longer to finish my project with Qwen because it needed so much handholding. I knew frontier models would've done the task with a single prompt[^7]. My mental load was heavier too: it is so much simpler to just prompt your way through with a frontier model. You don't really need to think. 

Though, in my case, I was using a small model for the sake of experimentation. In the real world, DWL on the left is visible on tasks that the models aren't good at *yet*. Like the odd finance and ML research benchmarks or some computer use tasks. You still need people reviewing the models' outputs and steering them.

If accuracy can be quantified and the task is economically valuable, it will be conquered eventually, likeliest first at the frontier, shifting to the right. This is true of tasks where labs and startups have an interest in introducing automation. It's part of the diffusion process. 

In the graph, the equilibrium makes sense if you think about it as the model with the best speed, price, and intelligence for the task. 

![Equilibrium between human steering and model cost, where the model is just right for the task.](/blog/assets/figures/en/human-model-equilibrium.png "Equilibrium Between Human Steering and Model Cost")

A "DWL-optimized harness" will be useful until we have terminal models, as costly intelligence diffuses to the economy and token usage grows by many orders of magnitude. Or indefinitely if governments introduce regulation that stalls the development of a terminal model and we settle into a status quo.

It will make most tasks near free, fast, runnable on edge hardware[^8], and routable to the cloud when necessary. I see three technical challenges in the way:

- Transferring context efficiently: how to transfer context between models at as close to zero cost and latency as possible. This matters for individual tasks and threads.
- Parallelism: if many models are doing many tasks, how can inference engines maximize GPU utilization and KV Cache / model weights offloading and reloading so every watt of compute is utilized constantly?
- Model Profiling: you don't need to route requests each time if you already know what models sit at equilibria. To my knowledge, there isn't an all-purpose toolkit to do this yet. 

I expect that while intelligence is subsidized, companies and individuals will keep using frontier models because it feels like the safe choice and requires less steering. Budget-conscious organizations will make their own evals and perhaps even RL small models on them (like [Ramp](https://x.com/RampLabs/status/2052447438795833506) did). 

But to diffuse AI into the wider economy, much work needs to be done on simple-to-use optimizers that small and medium-sized organizations can use to save on their token spend, both for individuals within an organization and for specific tasks. 

Paraphrased: Jev might be very cheap but your average store clerk or non-profit worker isn't gonna get an API key and make an eval to see if it beats Astra at their classification task. They'd rather press a button or ask their agent and see the results to choose from.

Getting there takes human effort: setting up the infrastructure and evals to find that model (both pre-selecting it or changing it at runtime). Whereas using a frontier model saves you the work but costs a lot.

I expect this to change with harnesses that auto-route and simpler infrastructure for evaluating and training task-specific models. It is also nice that this is a defined engineering effort. If we get it right once, everyone benefits.

The analogy also doesn't capture some qualitative aspects of models. Like how I'd rather use Claude for anything conversational, or Codex for computer use. It doesn't capture how people begin to trust that a model will get it right 90% of the time and use it for specific work.

It discounts qualitative differences in the character of different model lines. This is partly reconciled if we think of the x-axis as a model family, e.g., Haiku being underpowered, Sonnet generally balanced, and Opus often overkill.

Together, both parts of the graph paint a cohesive story: the frontier will lay the groundwork at the toughest challenges in an expensive, inefficient way, while diffusion makes them economically viable and fast.

I see two paths going forward for the future of work:
- Skills that cannot be optimized against (yet) will become increasingly valuable. E.g., interpersonal communication, relationship building.
- If we do optimize everything optimizable (though I expect this to take a long while), we'll make different problems for ourselves that 
require skills outside the scope of optimization (see [this](https://asteriskmag.com/issues/15/after-work-we-ll-have-each-other) essay).

In either case, we'll be better off from it. It will provide healthcare and education for millions of people in underprivileged areas, enable massive social mobility - the works. That is, if we align it. 

What about work that is not part of the graph? That is, work that doesn't have a quantifiable "right" result, such as the arts, and work (e.g., products, media) that is completely new and doesn't have a point of comparison to define right from.

If the model you're working with can do anything you ask[^9], "right" in a creative pursuit is entirely up to you. The model is perfectly matched to what you want it to do, so only you know where to stop (assuming the model is terminal).

To illustrate this: had French sculptor Auguste Rodin had access to a machine that could sculpt anything he wanted, he would've still spent a large amount of time tweaking his pieces and dialing in what they're meant to convey. Each is characterized by what the author was going through at the time, or the way he *chose* to portray other people.

Rodin's *Monument to Balzac* is a good example. 

![Detail of Auguste Rodin's Final Study for the Monument to Balzac: a bronze figure wrapped in a heavy cloak, head thrown back.](/blog/assets/monument-to-balzac-the-met.jpg "Auguste Rodin, Final Study for the Monument to Balzac. The Metropolitan Museum of Art.")

When Rodin set out to make a monument for Balzac, a prominent French writer, he stated "a man celebrated for his heart and mind should not be [represented by] his body" (see [reference](https://www.metmuseum.org/art/collection/search/207498)). We see this in the sculpture, it being far from idealized or beautified in its texture, contours, and the undefined shape of Balzac's face. 

This makes the sculpture iconic. It makes one wonder why the author chose to portray him like that. Other sculptors might've chosen to highlight him heroically or in a more grandiose way, but that wasn't Rodin. 

In other words: the process of making the piece and the choices taken by the author are the work. The end result is a reflection of that. Now that much of the process of creation of software and digital media has been commodified, intentional choices will differentiate works from each other. 

For example, Wall-E is beautiful yet dystopic, dire yet hopeful, emotional yet solemn. You could prompt a terminal model, "make a movie that's beautiful yet dystopic, dire yet hopeful, and emotional yet solemn", and it would make many movies but not Wall-E exactly. 

Making Wall-E - unique work broadly - can't be done descriptively. To make Wall-E without knowing about it (I assume you do :)), you would have to walk the same choices as its authors. But how? Your motivations, environment, and thoughts are different.

It's extremely unlikely you would. Works of art are unique because they stem from individuals with distinct life stories, preferences, and memories. 

I believe a post-scarcity world will be defined by this individuality.

Everyone will have limitless possibility, so we'll appreciate the ways each one of us is unique and chooses to work on specific things. More people will live to create, a luxury not many could afford until now. I'm excited for this future. 

It's already here, partially, as making this blog would have been considerably harder without AI. Now I get to write about how DWL has to do with AI - how esoteric!

I'm choosing not to talk about optimizing generic descriptions against brain responses (e.g. using Meta's [TRIBE v2](https://ai.meta.com/blog/tribe-v2-brain-predictive-foundation-model/), a model that predicts fMRI brain activity in response to media) because at that point, we'd be no better than drug addicts, pressing a button to get dopamine. Ah, wait, I just described TikTok. 

I don't think it'll come to that because dopamine is only meaningful with struggle. I think we'd just get bored. Like how we play video games to get fake challenges that feel nice when beaten. Or how eating too much ice cream makes you not want to eat it for a long time. 

Our new struggle will be acquiring inspiration, living unique lives, and making ever-more creative works. Or so I hope.

As a closing note, I think more economists should be looking at AI and more computer scientists looking at economics. Economists may find that some concepts map well in the field, as I tried to map DWL. Computer scientists can use analogous thinking from economics to better understand the direction of the field.

For example: the DWL triangle's area grows much faster the further you get from equilibrium. This means there is a small amount of loss if you over/undershoot the equilibrium by a bit, and a huge one if you're at either extreme. 

Someone building a model router might choose to accept some error away from equilibrium because the loss nearby is small, and instead optimize for avoiding the worst offenders (like having Fable do git push). This is a helpful mental frame I myself didn't know - Claude told me when I asked it for some ways DWL is analyzed that could connect to the post.

You'd have needed an economist that's into AI or a computer scientist that reads up on economics to connect the dots. Also, I didn't talk about the calculus and algebra that go into minimizing DWL for complex supply and demand curves. Some might be transferable to compute allocation. Go read!

[^1]: Ideally, each customer would be charged the maximum they can pay. This is referred to as first degree pricing. But often sellers don't know what that maximum price is, and instead offer many options at different tiers (e.g. 1st class, premium economy, economy) so the buyer chooses for themselves. This is referred to as second degree pricing. Third degree pricing forces customers to segment by making the quality gap between the options large or enforcing tiers (e.g. student discounts). They all aim to extract as much of what the customer can pay for a good from them, which is referred to as their surplus.

[^2]: Though, it follows similar rules. If you study economics further, I encourage you to learn about the concept of the "invisible hand". TLDR: markets minimize DWL on their own because inefficient arrangements will get outcompeted or outpriced by a competitor. But I won't spoil it for you. 

[^3]: 1 Billion tokens a day keeps the doctor away.  

[^4]: When the subsidies stop, I expect the rug pull to be similar to what happened when ridesharing apps stopped subsidizing rides and the true price was passed on to consumers. It wasn't pretty. 

[^5]: How many startups would be scrambling if the labs took away token subsidies today? Seriously. I was spending 6 figures in tokens at a previous startup (in API costs) every month. Had those been billed, it would've been like getting my salary paid twice! For a small startup this might be OK, but at the scale of large companies or AI-native organizations, this'd be a huge financing issue. Ajeya Cotra talked about this [here](https://www.youtube.com/watch?v=Z19UEZHJzAg). In the future, some money will be directed towards buying API credits or GPUs instead of paying humans because intelligence will be cheaper and faster.

[^6]: Though the scaling laws - especially test-time compute scaling - would suggest existing architectures won't suffice to reach a terminal model, because they trade off speed for intelligence.

[^7]: As Naval [said](https://www.youtube.com/shorts/x-P119dx8xM): 'waste tokens to save time'.

[^8]: Some early glimpses of inference at the edge are starting to show, as Anthropic detailed in [this](https://www.anthropic.com/research/self-replicating-ai) recent report. I expect phones and laptops to do most inference within this decade.

[^9]: This is already true in some domains, just not frictionless yet.