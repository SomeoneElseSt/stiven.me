import matplotlib.pyplot as plt
import numpy as np

NUM_FLIPS = 6

def outcome_to_sequence(outcome, length):
    if length == 0:
        return ''
    bits = format(outcome, f'0{length}b')
    return ''.join('H' if bit == '1' else 'T' for bit in bits)

def generate(theme):
    is_light = theme == 'light'
    bg = 'white' if is_light else 'black'
    fg = 'black' if is_light else 'white'

    fig, ax = plt.subplots(figsize=(14, 8), facecolor=bg)
    ax.set_facecolor(bg)

    colors = plt.cm.Blues(np.linspace(0.3, 0.9, NUM_FLIPS + 1))

    for flip in range(NUM_FLIPS + 1):
        total_outcomes = 2**flip
        height = 1 / total_outcomes

        for outcome in range(total_outcomes):
            y_position = outcome * height

            rect = plt.Rectangle((flip, y_position), 0.8, height,
                                linewidth=1, edgecolor=bg,
                                facecolor=colors[flip], alpha=0.7)
            ax.add_patch(rect)

            if flip <= 5:
                label = outcome_to_sequence(outcome, flip)
                ax.text(flip + 0.4, y_position + height/2, label,
                       ha='center', va='center', fontsize=8)

    ax.set_xlim(-0.5, NUM_FLIPS + 0.5)
    ax.set_ylim(0, 1)
    ax.set_xlabel('Coin Flip Number', fontsize=12, color=fg)
    ax.set_ylabel('Probability space (0–1)', fontsize=12, color=fg)
    ax.set_title(f'Sample Space Division: {NUM_FLIPS} Coin Flips\n(Total outcomes = 2^{NUM_FLIPS} = {2**NUM_FLIPS})', fontsize=14, color=fg)
    ax.set_xticks(range(NUM_FLIPS + 1))
    ax.grid(axis='x', alpha=0.3, color=fg)

    ax.tick_params(colors=fg)
    for spine in ax.spines.values():
        spine.set_color(fg)

    suffix = '-light' if is_light else ''
    plt.tight_layout()
    plt.savefig(f'coin-sample-space-n-6{suffix}.png', dpi=150, facecolor=bg)
    plt.close(fig)

generate('dark')
generate('light')
