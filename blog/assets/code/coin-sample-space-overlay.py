from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from PIL import Image
from scipy.special import comb

NUM_FLIPS = 100
STAIRCASE_FLIPS = 6
ALPHA_SCALE = 0.5


def generate_distribution_base(output_path, theme):
    is_light = theme == 'light'
    bg = 'white' if is_light else 'black'

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

    ax.set_xlim(0, NUM_FLIPS + 2)
    ax.set_ylim(0, 1)
    ax.set_xticks([])
    ax.set_yticks([])

    for spine in ax.spines.values():
        spine.set_visible(False)

    plt.tight_layout()
    plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor=bg)
    plt.close(fig)


def generate_staircase_overlay(output_path, theme):
    is_light = theme == 'light'
    bg = 'white' if is_light else 'black'
    fg = 'black' if is_light else 'white'

    fig, ax = plt.subplots(figsize=(14, 8), facecolor=bg)
    ax.set_facecolor(bg)

    colors = plt.cm.Blues(np.linspace(0.3, 0.9, STAIRCASE_FLIPS + 1))

    for flip in range(STAIRCASE_FLIPS + 1):
        total_outcomes = 2**flip
        height = 1 / total_outcomes

        for outcome in range(total_outcomes):
            y_position = outcome * height
            is_staircase = (outcome == 0 or outcome == total_outcomes - 1)

            if is_staircase:
                facecolor = colors[-1]
                alpha = 1.0
                edgecolor = fg
            else:
                facecolor = colors[flip]
                alpha = 0.15
                edgecolor = bg

            rect = plt.Rectangle(
                (flip, y_position),
                0.8,
                height,
                linewidth=1,
                edgecolor=edgecolor,
                facecolor=facecolor,
                alpha=alpha
            )
            ax.add_patch(rect)

    ax.set_xlim(-0.5, STAIRCASE_FLIPS + 0.5)
    ax.set_ylim(0, 1)
    ax.set_xticks([])
    ax.set_yticks([])

    for spine in ax.spines.values():
        spine.set_visible(False)

    plt.tight_layout()
    plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor=bg)
    plt.close(fig)


def overlay_images(base_path, overlay_path, output_path):
    if not base_path.exists():
        print(f'Missing base image: {base_path}')
        return
    if not overlay_path.exists():
        print(f'Missing overlay image: {overlay_path}')
        return

    base = Image.open(base_path).convert('RGBA')
    overlay = Image.open(overlay_path).convert('RGBA')

    overlay_flipped = overlay.transpose(Image.FLIP_LEFT_RIGHT)
    overlay_resized = overlay_flipped.resize(base.size, Image.LANCZOS)

    r, g, b, a = overlay_resized.split()
    a = a.point(lambda v: int(v * ALPHA_SCALE))
    overlay_transparent = Image.merge('RGBA', (r, g, b, a))

    combined = Image.alpha_composite(base, overlay_transparent)
    combined.save(output_path)


def generate_for_theme(assets_dir, theme):
    suffix = '-light' if theme == 'light' else ''
    base_path = assets_dir / f'coin-sample-space-proportion-heads-clean{suffix}.png'
    staircase_path = assets_dir / f'coin-sample-space-shaded-staircase-clean{suffix}.png'
    output_path = assets_dir / f'coin-sample-space-overlay{suffix}.png'

    generate_distribution_base(base_path, theme)
    generate_staircase_overlay(staircase_path, theme)
    overlay_images(base_path, staircase_path, output_path)


def main():
    assets_dir = Path(__file__).resolve().parent.parent
    generate_for_theme(assets_dir, 'dark')
    generate_for_theme(assets_dir, 'light')


main()
