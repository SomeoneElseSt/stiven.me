import matplotlib.pyplot as plt
import numpy as np

num_flips = 6

fig, ax = plt.subplots(figsize=(14, 8), facecolor='black')
ax.set_facecolor('black')

colors = plt.cm.Blues(np.linspace(0.3, 0.9, num_flips + 1))

def outcome_to_sequence(outcome, length):
    if length == 0:
        return ''
    bits = format(outcome, f'0{length}b')
    return ''.join('H' if bit == '1' else 'T' for bit in bits)

for flip in range(num_flips + 1):
    total_outcomes = 2**flip
    height = 1 / total_outcomes
    
    for outcome in range(total_outcomes):
        y_position = outcome * height
        
        # Highlight staircase: all T (outcome=0) or all H (outcome=max)
        is_staircase = (outcome == 0 or outcome == total_outcomes - 1)
        
        if is_staircase:
            facecolor = colors[-1]  # Darkest blue from the original scale
            alpha = 1.0
            edgecolor = 'white'
        else:
            facecolor = colors[flip]
            alpha = 0.15
            edgecolor = 'black'
        
        rect = plt.Rectangle((flip, y_position), 0.8, height, 
                            linewidth=1, edgecolor=edgecolor, 
                            facecolor=facecolor, alpha=alpha)
        ax.add_patch(rect)
        
        if flip <= 5:
            label = outcome_to_sequence(outcome, flip)
            ax.text(flip + 0.4, y_position + height/2, label, 
                   ha='center', va='center', fontsize=8, color='white')

ax.set_xlim(-0.5, num_flips + 0.5)
ax.set_ylim(0, 1)
ax.set_xlabel('Coin Flip Number', fontsize=12, color='white')
ax.set_ylabel('Probability space (0–1)', fontsize=12, color='white')
ax.set_title(f'Sample Space Division: {num_flips} Coin Flips\nShowing Shaded Staircases of Consecutive H/T Patterns.', fontsize=14, color='white')
ax.set_xticks(range(num_flips + 1))
ax.grid(axis='x', alpha=0.3, color='white')

ax.tick_params(colors='white')
for spine in ax.spines.values():
    spine.set_color('white')

plt.tight_layout()
plt.savefig('coin-sample-space-shaded-staircase.png', dpi=150)
plt.show()
