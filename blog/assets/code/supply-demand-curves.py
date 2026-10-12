import matplotlib.pyplot as plt
import numpy as np
from pathlib import Path

MIN_QUANTITY = 1
MAX_QUANTITY = 10
MAX_PRICE = 100
PRICE_TICK_STEP = 10
DEMAND_INTERCEPT = 100
DEMAND_SLOPE = -10
SUPPLY_INTERCEPT = 0
SUPPLY_SLOPE = 10
DEMAND_COLOR = '#4a90d9'
SUPPLY_COLOR = '#e8734a'
POINT_SIZE = 80
POINT_LABEL_FONT_SIZE = 10
EQUILIBRIUM_QUANTITY = 5
DWL_SHADE = 0.6
DWL_ALPHA = 0.7
DWL_FONT_SIZE = 14
OUTPUT_DIR = Path(__file__).resolve().parent.parent / "figures" / "en"

LABELS = {
    'xlabel': 'Quantity',
    'ylabel': 'Price',
    'demand': 'Demand curve',
    'supply': 'Supply curve',
}

# (quantity, label text position, horizontal alignment)
# Each scenario: quantity actually sold, plus (text position, alignment) for each labeled corner
DWL_SCENARIOS = [
    {
        'filename_stem': 'supply-demand-dwl',
        'traded_quantity': 2,
        'demand_label': ((2.6, 92), 'left'),
        'equilibrium_label': ((6.0, 50), 'left'),
        'supply_label': ((2.6, 12), 'left'),
    },
    {
        'filename_stem': 'supply-demand-dwl-low-price',
        'traded_quantity': 8,
        'demand_label': ((7.4, 8), 'right'),
        'equilibrium_label': ((4.4, 50), 'right'),
        'supply_label': ((6.6, 88), 'right'),
    },
]

EXAMPLE_POINTS = [
    {'quantity': 2, 'text_xy': (2.6, 92), 'align': 'left'},
    {'quantity': 5, 'text_xy': (6.0, 50), 'align': 'left'},
    {'quantity': 8, 'text_xy': (7.8, 8), 'align': 'right'},
]


def price_on_demand_curve(quantity):
    return DEMAND_INTERCEPT + DEMAND_SLOPE * quantity


def point_label(quantity):
    buyers_verb = 'buys' if quantity == 1 else 'buy'
    price = price_on_demand_curve(quantity)
    return f'(Costs \\${price:.0f} and {quantity} {buyers_verb} it. Net = \\${price * quantity:.0f})'


def draw_curves(ax, bg, fg):
    quantity = np.linspace(MIN_QUANTITY, MAX_QUANTITY, 200)
    demand = price_on_demand_curve(quantity)
    supply = SUPPLY_INTERCEPT + SUPPLY_SLOPE * quantity

    ax.set_facecolor(bg)
    ax.plot(quantity, demand, color=DEMAND_COLOR, linewidth=2.5, label=LABELS['demand'])
    ax.plot(quantity, supply, color=SUPPLY_COLOR, linewidth=2.5, label=LABELS['supply'])

    ax.set_xlim(MIN_QUANTITY, MAX_QUANTITY)
    ax.set_ylim(0, MAX_PRICE)
    ax.set_xlabel(LABELS['xlabel'], fontsize=12, color=fg)
    ax.set_ylabel(LABELS['ylabel'], fontsize=12, color=fg)
    ax.set_xticks(range(MIN_QUANTITY, MAX_QUANTITY + 1))
    ax.set_yticks(range(0, MAX_PRICE + 1, PRICE_TICK_STEP))
    ax.tick_params(colors=fg)
    for spine in ax.spines.values():
        spine.set_color(fg)
    legend = ax.legend(facecolor=bg, edgecolor=fg, framealpha=1, loc='upper right')
    for text in legend.get_texts():
        text.set_color(fg)


def draw_labeled_point(ax, bg, fg, point_xy, label, text_xy, align):
    ax.scatter([point_xy[0]], [point_xy[1]], s=POINT_SIZE, color=fg, edgecolor=bg, zorder=5, clip_on=False)
    ax.annotate(
        label,
        xy=point_xy,
        xytext=text_xy,
        ha=align,
        va='center',
        fontsize=POINT_LABEL_FONT_SIZE,
        color=fg,
        arrowprops={'arrowstyle': '-', 'color': fg, 'alpha': 0.6},
    )


def draw_example_points(ax, bg, fg):
    for example in EXAMPLE_POINTS:
        quantity = example['quantity']
        point_xy = (quantity, price_on_demand_curve(quantity))
        draw_labeled_point(ax, bg, fg, point_xy, point_label(quantity), example['text_xy'], example['align'])


def price_on_supply_curve(quantity):
    return SUPPLY_INTERCEPT + SUPPLY_SLOPE * quantity


def draw_deadweight_loss_triangle(ax, bg, fg, scenario):
    traded_quantity = scenario['traded_quantity']
    equilibrium_corner = (EQUILIBRIUM_QUANTITY, price_on_demand_curve(EQUILIBRIUM_QUANTITY))
    traded_demand_corner = (traded_quantity, price_on_demand_curve(traded_quantity))
    traded_supply_corner = (traded_quantity, price_on_supply_curve(traded_quantity))
    corners = [equilibrium_corner, traded_demand_corner, traded_supply_corner]

    triangle = plt.Polygon(corners, closed=True, facecolor=plt.cm.Blues(DWL_SHADE),
                           edgecolor=bg, linewidth=1, alpha=DWL_ALPHA, zorder=1)
    ax.add_patch(triangle)
    center_quantity = sum(corner[0] for corner in corners) / len(corners)
    center_price = sum(corner[1] for corner in corners) / len(corners)
    ax.text(center_quantity, center_price, 'DWL', ha='center', va='center',
            fontsize=DWL_FONT_SIZE, color=fg, zorder=4)

    traded_price = traded_demand_corner[1]
    equilibrium_net = equilibrium_corner[0] * equilibrium_corner[1]
    equilibrium_label = f'Equilibrium: \\${equilibrium_net:.0f}'
    supply_label = f'({traded_quantity} sold at \\${traded_price:.0f}. Net = \\${traded_quantity * traded_price:.0f})'
    labeled_corners = [
        (traded_demand_corner, point_label(traded_quantity), scenario['demand_label']),
        (equilibrium_corner, equilibrium_label, scenario['equilibrium_label']),
        (traded_supply_corner, supply_label, scenario['supply_label']),
    ]
    for corner, label, (text_xy, align) in labeled_corners:
        draw_labeled_point(ax, bg, fg, corner, label, text_xy, align)


def render(theme, filename_stem, with_points, dwl_scenario=None):
    is_light = theme == 'light'
    bg = 'white' if is_light else 'black'
    fg = 'black' if is_light else 'white'

    fig, ax = plt.subplots(figsize=(8, 6), facecolor=bg)
    draw_curves(ax, bg, fg)
    if with_points:
        draw_example_points(ax, bg, fg)
    if dwl_scenario:
        draw_deadweight_loss_triangle(ax, bg, fg, dwl_scenario)

    suffix = '-light' if is_light else ''
    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / f'{filename_stem}{suffix}.png', dpi=150, facecolor=bg)
    plt.close(fig)


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for theme in ['dark', 'light']:
        render(theme, 'supply-demand-curves', with_points=False)
        render(theme, 'supply-demand-equilibrium', with_points=True)
        for scenario in DWL_SCENARIOS:
            render(theme, scenario['filename_stem'], with_points=False, dwl_scenario=scenario)


main()
