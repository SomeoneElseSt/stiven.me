import matplotlib.pyplot as plt
import numpy as np
from scipy.special import comb

NUM_FLIPS = 100

def generate(theme):
    is_light = theme == 'light'
    bg = 'white' if is_light else 'black'
    fg = 'black' if is_light else 'white'

    fig, ax = plt.subplots(figsize=(20, 14), facecolor=bg)
    ax.set_facecolor(bg)

    for flip in range(1, NUM_FLIPS + 1):
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
        color=fg,
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

    ax.set_xlim(0, NUM_FLIPS + 2)
    ax.set_ylim(0, 1)
    ax.set_xlabel('Number of Coin Flips (n)', fontsize=16, fontweight='bold', color=fg)
    ax.set_ylabel('Proportion of Heads', fontsize=16, fontweight='bold', color=fg)
    ax.set_title(
        'Proportion of Heads in the Sample Space\n'
        'A Normal Distribution Emerges Naturally',
        fontsize=17,
        fontweight='bold',
        pad=20,
        color=fg
    )

    sm = plt.cm.ScalarMappable(cmap=plt.cm.RdYlBu_r, norm=plt.Normalize(vmin=0, vmax=1))
    sm.set_array([])
    cbar = plt.colorbar(sm, ax=ax, pad=0.01, fraction=0.046)
    cbar.set_label('Relative Probability Density', fontsize=14, fontweight='bold', color=fg)
    cbar.ax.yaxis.set_tick_params(color=fg)
    plt.setp(plt.getp(cbar.ax.axes, 'yticklabels'), color=fg)

    ax.legend(loc='upper right', fontsize=13, framealpha=0.9)

    ax.tick_params(colors=fg)
    for spine in ax.spines.values():
        spine.set_color(fg)

    suffix = '-light' if is_light else ''
    plt.tight_layout()
    plt.savefig(f'coin-sample-space-proportion-heads{suffix}.png', dpi=150, bbox_inches='tight', facecolor=bg)
    plt.close(fig)

generate('dark')
generate('light')
