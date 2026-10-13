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
DWL_LABEL = 'DWL'
DWL_LEFT_COLORMAP = plt.cm.Blues
DWL_RIGHT_COLORMAP = plt.cm.Oranges
DWL_LABEL_GAP = 6
PROMPT_FONT_SIZE = 10
PROMPT_LINE_HEIGHT = 1.2
OUTPUT_DIR = Path(__file__).resolve().parent.parent / "figures" / "en"

PERCENT_MAX = 100
HUMAN_MODEL_EQUILIBRIUM = 50
HUMAN_MODEL_EQUILIBRIUM_TEXT = 'Equilibrium: model is just\nright for the task'
HUMAN_MODEL_X_TICKS = (0, 50, 100)
HUMAN_MODEL_X_TICK_LABELS = ('Too weak', 'Just right', 'Overkill')
HUMAN_MODEL_Y_TICKS = (0, 100)
HUMAN_MODEL_Y_TICK_LABELS = ('Low', 'High')
HUMAN_MODEL_EQUILIBRIUM_TEXT_X = 57
OVERRELIANCE_AUTONOMY = 100
OVERRELIANCE_TEXT = 'yes, push it'
UNDERRELIANCE_AUTONOMY = 0
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
    'x_tick_labels': None,
    'y_tick_labels': None,
}

HUMAN_MODEL_SPEC = {
    'x_range': (0, PERCENT_MAX),
    'y_range': (0, PERCENT_MAX),
    'x_ticks': HUMAN_MODEL_X_TICKS,
    'y_ticks': HUMAN_MODEL_Y_TICKS,
    'first_curve': human_steering_share,
    'second_curve': model_skill_share,
    'xlabel': 'Model capability relative to the task',
    'ylabel': 'Cost',
    'first_label': 'Human steering',
    'second_label': 'Model cost',
    'x_tick_labels': HUMAN_MODEL_X_TICK_LABELS,
    'y_tick_labels': HUMAN_MODEL_Y_TICK_LABELS,
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

# Each example: model capability, the curve the dot sits on, and its label text position and alignment
HUMAN_MODEL_EXAMPLE_POINTS = [
    {
        'capability': 20,
        'curve': human_steering_share,
        'label': '(Human steers {steering:.0f}% of the way.\nModel is cheap)',
        'text_xy': (3, 58),
        'align': 'left',
    },
    {
        'capability': 80,
        'curve': model_skill_share,
        'label': '(Human steers {steering:.0f}% of the way.\nModel is costly)',
        'text_xy': (97, 58),
        'align': 'right',
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
    ax.set_xticks(spec['x_ticks'], spec['x_tick_labels'])
    ax.set_yticks(spec['y_ticks'], spec['y_tick_labels'])
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


def draw_human_model_example_points(ax, bg, fg):
    for example in HUMAN_MODEL_EXAMPLE_POINTS:
        capability = example['capability']
        point_xy = (capability, example['curve'](capability))
        label = example['label'].format(steering=human_steering_share(capability))
        draw_labeled_point(ax, bg, fg, point_xy, label, example['text_xy'], example['align'])


def dwl_colormap(traded_x, equilibrium_x):
    return DWL_LEFT_COLORMAP if traded_x < equilibrium_x else DWL_RIGHT_COLORMAP


def triangle_center(corners):
    center_x = sum(corner[0] for corner in corners) / len(corners)
    center_y = sum(corner[1] for corner in corners) / len(corners)
    return center_x, center_y


def draw_shaded_triangle(ax, bg, corners, colormap):
    triangle = plt.Polygon(corners, closed=True, facecolor=colormap(DWL_SHADE),
                           edgecolor=bg, linewidth=1, alpha=DWL_ALPHA, zorder=1)
    ax.add_patch(triangle)


def draw_dwl_label(ax, fg, corners):
    ax.text(*triangle_center(corners), DWL_LABEL, ha='center', va='center',
            fontsize=DWL_FONT_SIZE, color=fg, zorder=4)


def draw_dwl_label_with_prompt(ax, fg, corners, prompt):
    center = triangle_center(corners)
    prompt_line_count = prompt.count('\n') + 1
    half_prompt_height = prompt_line_count * PROMPT_FONT_SIZE * PROMPT_LINE_HEIGHT / 2
    ax.text(*center, prompt, ha='center', va='center',
            fontsize=PROMPT_FONT_SIZE, color=fg, zorder=4)
    # Offset in points so the DWL label sits just above the prompt regardless of its line count
    ax.annotate(DWL_LABEL, xy=center, xytext=(0, half_prompt_height + DWL_LABEL_GAP),
                textcoords='offset points', ha='center', va='bottom',
                fontsize=DWL_FONT_SIZE, color=fg, zorder=4)


def draw_human_model_underreliance_triangle(ax, bg, fg):
    equilibrium_corner = (HUMAN_MODEL_EQUILIBRIUM, human_steering_share(HUMAN_MODEL_EQUILIBRIUM))
    human_corner = (UNDERRELIANCE_AUTONOMY, human_steering_share(UNDERRELIANCE_AUTONOMY))
    model_corner = (UNDERRELIANCE_AUTONOMY, model_skill_share(UNDERRELIANCE_AUTONOMY))
    corners = [equilibrium_corner, human_corner, model_corner]
    draw_shaded_triangle(ax, bg, corners, dwl_colormap(UNDERRELIANCE_AUTONOMY, HUMAN_MODEL_EQUILIBRIUM))
    draw_dwl_label_with_prompt(ax, fg, corners, UNDERRELIANCE_TEXT)


def draw_human_model_equilibrium_point(ax, bg, fg):
    equilibrium_corner = (HUMAN_MODEL_EQUILIBRIUM, human_steering_share(HUMAN_MODEL_EQUILIBRIUM))
    text_xy = (HUMAN_MODEL_EQUILIBRIUM_TEXT_X, equilibrium_corner[1])
    draw_labeled_point(ax, bg, fg, equilibrium_corner, HUMAN_MODEL_EQUILIBRIUM_TEXT, text_xy, 'left')


def draw_human_model_overreliance_triangle(ax, bg, fg):
    equilibrium_corner = (HUMAN_MODEL_EQUILIBRIUM, human_steering_share(HUMAN_MODEL_EQUILIBRIUM))
    human_corner = (OVERRELIANCE_AUTONOMY, human_steering_share(OVERRELIANCE_AUTONOMY))
    model_corner = (OVERRELIANCE_AUTONOMY, model_skill_share(OVERRELIANCE_AUTONOMY))
    corners = [equilibrium_corner, human_corner, model_corner]
    draw_shaded_triangle(ax, bg, corners, dwl_colormap(OVERRELIANCE_AUTONOMY, HUMAN_MODEL_EQUILIBRIUM))
    draw_dwl_label_with_prompt(ax, fg, corners, OVERRELIANCE_TEXT)


def draw_deadweight_loss_triangle(ax, bg, fg, scenario):
    traded_quantity = scenario['traded_quantity']
    equilibrium_corner = (EQUILIBRIUM_QUANTITY, price_on_demand_curve(EQUILIBRIUM_QUANTITY))
    traded_demand_corner = (traded_quantity, price_on_demand_curve(traded_quantity))
    traded_supply_corner = (traded_quantity, price_on_supply_curve(traded_quantity))
    corners = [equilibrium_corner, traded_demand_corner, traded_supply_corner]

    draw_shaded_triangle(ax, bg, corners, dwl_colormap(traded_quantity, EQUILIBRIUM_QUANTITY))
    draw_dwl_label(ax, fg, corners)

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
        render(theme, 'human-model-curves', with_points=False, spec=HUMAN_MODEL_SPEC,
               extra_drawing=draw_human_model_example_points)
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
