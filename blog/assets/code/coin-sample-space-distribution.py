import matplotlib.pyplot as plt
import numpy as np
from scipy.special import comb

num_flips = 100

fig, ax = plt.subplots(figsize=(20, 14), facecolor='black')
ax.set_facecolor('black')

for flip in range(1, num_flips + 1):
    max_prob = comb(flip, flip // 2, exact=True) * (0.5 ** flip)
    marker_size = max(5, 200 / np.sqrt(flip))

    for num_heads in range(flip + 1):
        prob = comb(flip, num_heads, exact=True) * (0.5 ** flip)
        relative_prob = prob / max_prob
        color = plt.cm.RdYlBu_r(relative_prob)
        y_proportion = num_heads / flip

        ax.scatter(
            flip,
            y_proportion,
            c=[color],
            s=marker_size,
            marker='s',
            edgecolors='none',
            alpha=0.95,
            rasterized=True
        )

ax.axhline(
    y=0.5,
    color='white',
    linestyle='--',
    linewidth=3,
    alpha=0.9,
    label='Mean (50% heads)',
    zorder=10
)

flip_points = [10, 25, 50, 75, 100]
for flip in flip_points:
    std_dev = np.sqrt(flip * 0.5 * 0.5)
    std_proportion = std_dev / flip

    ax.plot(
        [flip, flip],
        [0.5 - std_proportion, 0.5 + std_proportion],
        'yellow',
        linewidth=5,
        alpha=0.8,
        zorder=9
    )

    ax.plot(
        [flip, flip],
        [0.5 - 2 * std_proportion, 0.5 + 2 * std_proportion],
        'orange',
        linewidth=3,
        alpha=0.6,
        zorder=8
    )

ax.set_xlim(0, num_flips + 2)
ax.set_ylim(0, 1)
ax.set_xlabel('Number of Coin Flips (n)', fontsize=16, fontweight='bold', color='white')
ax.set_ylabel('Proportion of Heads', fontsize=16, fontweight='bold', color='white')
ax.set_title(
    'Proportion of Heads in the Sample Space\n'
    'A Normal Distribution Emerges Naturally',
    fontsize=17,
    fontweight='bold',
    pad=20,
    color='white'
)

sm = plt.cm.ScalarMappable(cmap=plt.cm.RdYlBu_r, norm=plt.Normalize(vmin=0, vmax=1))
sm.set_array([])
cbar = plt.colorbar(sm, ax=ax, pad=0.01, fraction=0.046)
cbar.set_label('Relative Probability Density', fontsize=14, fontweight='bold', color='white')
cbar.ax.yaxis.set_tick_params(color='white')
plt.setp(plt.getp(cbar.ax.axes, 'yticklabels'), color='white')

ax.legend(loc='upper right', fontsize=13, framealpha=0.9)

ax.tick_params(colors='white')
for spine in ax.spines.values():
    spine.set_color('white')

plt.tight_layout()
plt.savefig('coin-sample-space-proportion-heads.png', dpi=150, bbox_inches='tight', facecolor='black')
plt.show()
