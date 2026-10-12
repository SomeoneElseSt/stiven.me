import matplotlib.pyplot as plt
import numpy as np
from matplotlib.ticker import PercentFormatter
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

PERCENT_MAX = 100
PERCENT_TICK_STEP = 10
HUMAN_MODEL_EQUILIBRIUM = 50
HUMAN_MODEL_EQUILIBRIUM_TEXT = 'Equilibrium: Human set up\nresults in optimized model'
HUMAN_MODEL_EQUILIBRIUM_TEXT_X = 57
OVERRELIANCE_AUTONOMY = 80
OVERRELIANCE_TEXT = 'yes, push it'
UNDERRELIANCE_AUTONOMY = 10
UNDERRELIANCE_FONT_SIZE = 9
UNDERRELIANCE_TEXT = (
    'Edit lines 100-112.\n'
    'Change the function\n'
    'to check all pages\n'
    'instead of just the\n'
    'current one.\n'
    'Then...'
)


def price_on_demand_curve(quantity):
    return DEMAND_INTERCEPT + DEMAND_SLOPE * quantity


def price_on_supply_curve(quantity):
    return SUPPLY_INTERCEPT + SUPPLY_SLOPE * quantity


def human_steering_share(autonomy):
    return PERCENT_MAX - autonomy


def model_skill_share(autonomy):
    return autonomy


ECONOMICS_SPEC = {
    'x_range': (MIN_QUANTITY, MAX_QUANTITY),
    'y_range': (0, MAX_PRICE),
    'x_ticks': range(MIN_QUANTITY, MAX_QUANTITY + 1),
    'y_ticks': range(0, MAX_PRICE + 1, PRICE_TICK_STEP),
    'first_curve': price_on_demand_curve,
    'second_curve': price_on_supply_curve,
    'xlabel': 'Quantity',
    'ylabel': 'Price',
    'first_label': 'Demand curve',
    'second_label': 'Supply curve',
    'as_percent': False,
}

HUMAN_MODEL_SPEC = {
    'x_range': (0, PERCENT_MAX),
    'y_range': (0, PERCENT_MAX),
    'x_ticks': range(0, PERCENT_MAX + 1, PERCENT_TICK_STEP),
    'y_ticks': range(0, PERCENT_MAX + 1, PERCENT_TICK_STEP),
    'first_curve': human_steering_share,
    'second_curve': model_skill_share,
    'xlabel': 'Task completed autonomously by the model',
    'ylabel': 'Share of effort',
    'first_label': 'Human steering',
    'second_label': 'Model effort',
    'as_percent': True,
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


def point_label(quantity):
    buyers_verb = 'buys' if quantity == 1 else 'buy'
    price = price_on_demand_curve(quantity)
    return f'(Costs \\${price:.0f} and {quantity} {buyers_verb} it. Net = \\${price * quantity:.0f})'


def draw_curves(ax, bg, fg, spec=ECONOMICS_SPEC):
    x_values = np.linspace(*spec['x_range'], 200)

    ax.set_facecolor(bg)
    ax.plot(x_values, spec['first_curve'](x_values), color=DEMAND_COLOR, linewidth=2.5, label=spec['first_label'])
    ax.plot(x_values, spec['second_curve'](x_values), color=SUPPLY_COLOR, linewidth=2.5, label=spec['second_label'])

    ax.set_xlim(*spec['x_range'])
    ax.set_ylim(*spec['y_range'])
    ax.set_xlabel(spec['xlabel'], fontsize=12, color=fg)
    ax.set_ylabel(spec['ylabel'], fontsize=12, color=fg)
    ax.set_xticks(spec['x_ticks'])
    ax.set_yticks(spec['y_ticks'])
    if spec['as_percent']:
        ax.xaxis.set_major_formatter(PercentFormatter(xmax=PERCENT_MAX))
        ax.yaxis.set_major_formatter(PercentFormatter(xmax=PERCENT_MAX))
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


def draw_shaded_triangle(ax, bg, fg, corners, text, font_size=DWL_FONT_SIZE):
    triangle = plt.Polygon(corners, closed=True, facecolor=plt.cm.Blues(DWL_SHADE),
                           edgecolor=bg, linewidth=1, alpha=DWL_ALPHA, zorder=1)
    ax.add_patch(triangle)
    center_x = sum(corner[0] for corner in corners) / len(corners)
    center_y = sum(corner[1] for corner in corners) / len(corners)
    ax.text(center_x, center_y, text, ha='center', va='center',
            fontsize=font_size, color=fg, zorder=4)


def draw_human_model_underreliance_triangle(ax, bg, fg):
    equilibrium_corner = (HUMAN_MODEL_EQUILIBRIUM, human_steering_share(HUMAN_MODEL_EQUILIBRIUM))
    human_corner = (UNDERRELIANCE_AUTONOMY, human_steering_share(UNDERRELIANCE_AUTONOMY))
    model_corner = (UNDERRELIANCE_AUTONOMY, model_skill_share(UNDERRELIANCE_AUTONOMY))
    corners = [equilibrium_corner, human_corner, model_corner]
    draw_shaded_triangle(ax, bg, fg, corners, UNDERRELIANCE_TEXT, UNDERRELIANCE_FONT_SIZE)


def draw_human_model_equilibrium_point(ax, bg, fg):
    equilibrium_corner = (HUMAN_MODEL_EQUILIBRIUM, human_steering_share(HUMAN_MODEL_EQUILIBRIUM))
    text_xy = (HUMAN_MODEL_EQUILIBRIUM_TEXT_X, equilibrium_corner[1])
    draw_labeled_point(ax, bg, fg, equilibrium_corner, HUMAN_MODEL_EQUILIBRIUM_TEXT, text_xy, 'left')


def draw_human_model_overreliance_triangle(ax, bg, fg):
    equilibrium_corner = (HUMAN_MODEL_EQUILIBRIUM, human_steering_share(HUMAN_MODEL_EQUILIBRIUM))
    human_corner = (OVERRELIANCE_AUTONOMY, human_steering_share(OVERRELIANCE_AUTONOMY))
    model_corner = (OVERRELIANCE_AUTONOMY, model_skill_share(OVERRELIANCE_AUTONOMY))
    draw_shaded_triangle(ax, bg, fg, [equilibrium_corner, human_corner, model_corner], OVERRELIANCE_TEXT)


def draw_deadweight_loss_triangle(ax, bg, fg, scenario):
    traded_quantity = scenario['traded_quantity']
    equilibrium_corner = (EQUILIBRIUM_QUANTITY, price_on_demand_curve(EQUILIBRIUM_QUANTITY))
    traded_demand_corner = (traded_quantity, price_on_demand_curve(traded_quantity))
    traded_supply_corner = (traded_quantity, price_on_supply_curve(traded_quantity))
    corners = [equilibrium_corner, traded_demand_corner, traded_supply_corner]

    draw_shaded_triangle(ax, bg, fg, corners, 'DWL')

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


def render(theme, filename_stem, with_points, dwl_scenario=None, spec=ECONOMICS_SPEC, extra_drawing=None):
    is_light = theme == 'light'
    bg = 'white' if is_light else 'black'
    fg = 'black' if is_light else 'white'

    fig, ax = plt.subplots(figsize=(8, 6), facecolor=bg)
    draw_curves(ax, bg, fg, spec)
    if with_points:
        draw_example_points(ax, bg, fg)
    if dwl_scenario:
        draw_deadweight_loss_triangle(ax, bg, fg, dwl_scenario)
    if extra_drawing:
        extra_drawing(ax, bg, fg)

    suffix = '-light' if is_light else ''
    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / f'{filename_stem}{suffix}.png', dpi=150, facecolor=bg)
    plt.close(fig)


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for theme in ['dark', 'light']:
        render(theme, 'supply-demand-curves', with_points=False)
        render(theme, 'human-model-curves', with_points=False, spec=HUMAN_MODEL_SPEC)
        render(theme, 'human-model-equilibrium', with_points=False, spec=HUMAN_MODEL_SPEC,
               extra_drawing=draw_human_model_equilibrium_point)
        render(theme, 'human-model-underreliance', with_points=False, spec=HUMAN_MODEL_SPEC,
               extra_drawing=draw_human_model_underreliance_triangle)
        render(theme, 'human-model-overreliance', with_points=False, spec=HUMAN_MODEL_SPEC,
               extra_drawing=draw_human_model_overreliance_triangle)
        render(theme, 'supply-demand-equilibrium', with_points=True)
        for scenario in DWL_SCENARIOS:
            render(theme, scenario['filename_stem'], with_points=False, dwl_scenario=scenario)


main()
