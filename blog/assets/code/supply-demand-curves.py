import matplotlib
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
DWL_LEFT_COLORMAP = plt.cm.Blues
DWL_RIGHT_COLORMAP = plt.cm.Oranges
DWL_LABEL_GAP = 6
PROMPT_FONT_SIZE = 10
PROMPT_LINE_HEIGHT = 1.2
FIGURES_DIR = Path(__file__).resolve().parent.parent / "figures"
DEFAULT_FONT = 'DejaVu Sans'

PERCENT_MAX = 100
HUMAN_MODEL_EQUILIBRIUM = 50
HUMAN_MODEL_X_TICKS = (0, 50, 100)
HUMAN_MODEL_Y_TICKS = (0, 100)
HUMAN_MODEL_EQUILIBRIUM_TEXT_X = 57
OVERRELIANCE_AUTONOMY = 100
UNDERRELIANCE_AUTONOMY = 0

LOCALE_FONTS = {
    'ja': 'Hiragino Sans',
    'ko': 'Apple SD Gothic Neo',
    'zh': 'Songti SC',
    'hi': 'Kohinoor Devanagari',
}

# Label templates take {price}, {quantity}, {net} and {steering}; money values arrive already formatted
LOCALE_LABELS = {
    'en': {
        'quantity': 'Quantity', 'price': 'Price',
        'demand_curve': 'Demand curve', 'supply_curve': 'Supply curve',
        'capability': 'Model capability relative to the task', 'cost': 'Cost',
        'human_steering': 'Human effort', 'model_cost': 'Model cost',
        'too_weak': 'Too weak', 'just_right': 'Just right', 'overkill': 'Overkill',
        'cheap': 'Cheap', 'costly': 'Costly',
        'point': '(Costs {price} and {quantity} buy it. Net = {net})',
        'sold': '({quantity} sold at {price}. Net = {net})',
        'equilibrium_net': 'Equilibrium: {net}',
        'equilibrium_model': 'Equilibrium: when the model is\njust right for the task',
        'steers_cheap': '(Human steers {steering}% of the way.\nModel is cheap)',
        'steers_costly': '(Human steers {steering}% of the way.\nModel is costly)',
        'dwl': 'DWL',
        'overkill_prompt': 'yes, push it',
        'handholding_prompt': 'Edit lines 100-112.\nChange the function\nto check all pages\ninstead of just the\ncurrent one.\nThen...',
    },
    'es': {
        'quantity': 'Cantidad', 'price': 'Precio',
        'demand_curve': 'Curva de demanda', 'supply_curve': 'Curva de oferta',
        'capability': 'Capacidad del modelo en relación con la tarea', 'cost': 'Coste',
        'human_steering': 'Dirección humana', 'model_cost': 'Coste del modelo',
        'too_weak': 'Demasiado débil', 'just_right': 'Justo', 'overkill': 'Excesivo',
        'cheap': 'Barato', 'costly': 'Caro',
        'point': '(Cuesta {price} y lo compran {quantity}. Neto = {net})',
        'sold': '({quantity} vendidos a {price}. Neto = {net})',
        'equilibrium_net': 'Equilibrio: {net}',
        'equilibrium_model': 'Equilibrio: el modelo es justo\nel adecuado para la tarea',
        'steers_cheap': '(El humano dirige el {steering}%\ndel camino. El modelo es barato)',
        'steers_costly': '(El humano dirige el {steering}%\ndel camino. El modelo es caro)',
        'dwl': 'PPM',
        'overkill_prompt': 'sí, haz push',
        'handholding_prompt': 'Edita las líneas 100-112.\nCambia la función\npara que revise todas\nlas páginas y no solo\nla actual.\nLuego...',
    },
    'de': {
        'quantity': 'Menge', 'price': 'Preis',
        'demand_curve': 'Nachfragekurve', 'supply_curve': 'Angebotskurve',
        'capability': 'Modellfähigkeit im Verhältnis zur Aufgabe', 'cost': 'Kosten',
        'human_steering': 'Menschliche Steuerung', 'model_cost': 'Modellkosten',
        'too_weak': 'Zu schwach', 'just_right': 'Genau richtig', 'overkill': 'Überdimensioniert',
        'cheap': 'Billig', 'costly': 'Teuer',
        'point': '(Kostet {price}, {quantity} kaufen es. Netto = {net})',
        'sold': '({quantity} verkauft zu {price}. Netto = {net})',
        'equilibrium_net': 'Gleichgewicht: {net}',
        'equilibrium_model': 'Gleichgewicht: Modell passt\ngenau zur Aufgabe',
        'steers_cheap': '(Mensch steuert {steering}%\ndes Weges. Modell ist billig)',
        'steers_costly': '(Mensch steuert {steering}%\ndes Weges. Modell ist teuer)',
        'dwl': 'DWL',
        'overkill_prompt': 'ja, push es',
        'handholding_prompt': 'Bearbeite die Zeilen\n100-112. Ändere die\nFunktion so, dass sie\nalle Seiten prüft statt\nnur die aktuelle.\nDann...',
    },
    'fr': {
        'quantity': 'Quantité', 'price': 'Prix',
        'demand_curve': 'Courbe de demande', 'supply_curve': "Courbe d'offre",
        'capability': 'Capacité du modèle par rapport à la tâche', 'cost': 'Coût',
        'human_steering': 'Pilotage humain', 'model_cost': 'Coût du modèle',
        'too_weak': 'Trop faible', 'just_right': "Juste ce qu'il faut", 'overkill': 'Surdimensionné',
        'cheap': 'Bon marché', 'costly': 'Coûteux',
        'point': "(Coûte {price} et {quantity} l'achètent. Net = {net})",
        'sold': '({quantity} vendus à {price}. Net = {net})',
        'equilibrium_net': 'Équilibre : {net}',
        'equilibrium_model': "Équilibre : le modèle est juste\nce qu'il faut pour la tâche",
        'steers_cheap': "(L'humain pilote {steering} %\ndu chemin. Le modèle\nest bon marché)",
        'steers_costly': "(L'humain pilote {steering} %\ndu chemin. Le modèle\nest coûteux)",
        'dwl': 'DWL',
        'overkill_prompt': 'oui, pousse-le',
        'handholding_prompt': "Modifie les lignes\n100-112. Change la\nfonction pour qu'elle\nvérifie toutes les pages\net pas seulement l'actuelle.\nEnsuite...",
    },
    'pt': {
        'quantity': 'Quantidade', 'price': 'Preço',
        'demand_curve': 'Curva de demanda', 'supply_curve': 'Curva de oferta',
        'capability': 'Capacidade do modelo em relação à tarefa', 'cost': 'Custo',
        'human_steering': 'Direção humana', 'model_cost': 'Custo do modelo',
        'too_weak': 'Fraco demais', 'just_right': 'Na medida certa', 'overkill': 'Exagero',
        'cheap': 'Barato', 'costly': 'Caro',
        'point': '(Custa {price} e {quantity} compram. Líquido = {net})',
        'sold': '({quantity} vendidos a {price}. Líquido = {net})',
        'equilibrium_net': 'Equilíbrio: {net}',
        'equilibrium_model': 'Equilíbrio: o modelo está na\nmedida certa para a tarefa',
        'steers_cheap': '(O humano dirige {steering}%\ndo caminho. O modelo é barato)',
        'steers_costly': '(O humano dirige {steering}%\ndo caminho. O modelo é caro)',
        'dwl': 'DWL',
        'overkill_prompt': 'sim, faz o push',
        'handholding_prompt': 'Edite as linhas 100-112.\nMude a função para\nverificar todas as\npáginas em vez de só\na atual.\nDepois...',
    },
    'pl': {
        'quantity': 'Ilość', 'price': 'Cena',
        'demand_curve': 'Krzywa popytu', 'supply_curve': 'Krzywa podaży',
        'capability': 'Zdolność modelu względem zadania', 'cost': 'Koszt',
        'human_steering': 'Ludzkie sterowanie', 'model_cost': 'Koszt modelu',
        'too_weak': 'Zbyt słaby', 'just_right': 'W sam raz', 'overkill': 'Przesada',
        'cheap': 'Tani', 'costly': 'Drogi',
        'point': '(Cena {price}, kupujących: {quantity}. Netto = {net})',
        'sold': '(Sprzedano {quantity} po {price}. Netto = {net})',
        'equilibrium_net': 'Równowaga: {net}',
        'equilibrium_model': 'Równowaga: model jest\nw sam raz do zadania',
        'steers_cheap': '(Człowiek steruje przez {steering}%\ndrogi. Model jest tani)',
        'steers_costly': '(Człowiek steruje przez {steering}%\ndrogi. Model jest drogi)',
        'dwl': 'DWL',
        'overkill_prompt': 'tak, wypchnij to',
        'handholding_prompt': 'Edytuj linie 100-112.\nZmień funkcję, żeby\nsprawdzała wszystkie\nstrony, a nie tylko\nbieżącą.\nPotem...',
    },
    'ja': {
        'quantity': '数量', 'price': '価格',
        'demand_curve': '需要曲線', 'supply_curve': '供給曲線',
        'capability': 'タスクに対するモデルの能力', 'cost': 'コスト',
        'human_steering': '人間のステアリング', 'model_cost': 'モデルのコスト',
        'too_weak': '弱すぎる', 'just_right': 'ちょうどいい', 'overkill': '過剰性能',
        'cheap': '安価', 'costly': '高価',
        'point': '（価格{price}で{quantity}人が購入。合計 = {net}）',
        'sold': '（{price}で{quantity}個販売。合計 = {net}）',
        'equilibrium_net': '均衡：{net}',
        'equilibrium_model': '均衡：モデルがタスクに\nちょうどいい',
        'steers_cheap': '（人間が道のりの{steering}%を\nステアリング。モデルは安価）',
        'steers_costly': '（人間が道のりの{steering}%を\nステアリング。モデルは高価）',
        'dwl': 'DWL',
        'overkill_prompt': 'はい、プッシュして',
        'handholding_prompt': '100〜112行目を編集して。\n関数を変更して、\n現在のページだけでなく\n全ページをチェック\nするようにして。\nそれから…',
    },
    'ko': {
        'quantity': '수량', 'price': '가격',
        'demand_curve': '수요 곡선', 'supply_curve': '공급 곡선',
        'capability': '작업 대비 모델의 능력', 'cost': '비용',
        'human_steering': '인간의 조향', 'model_cost': '모델 비용',
        'too_weak': '너무 약함', 'just_right': '딱 맞음', 'overkill': '과함',
        'cheap': '저렴', 'costly': '비쌈',
        'point': '(가격 {price}, {quantity}명 구매. 합계 = {net})',
        'sold': '({price}에 {quantity}개 판매. 합계 = {net})',
        'equilibrium_net': '균형: {net}',
        'equilibrium_model': '균형: 모델이 작업에\n딱 맞음',
        'steers_cheap': '(인간이 과정의 {steering}%를 조향.\n모델은 저렴)',
        'steers_costly': '(인간이 과정의 {steering}%를 조향.\n모델은 비쌈)',
        'dwl': 'DWL',
        'overkill_prompt': '네, 푸시해',
        'handholding_prompt': '100-112행을 수정해.\n함수를 바꿔서\n현재 페이지만이 아니라\n모든 페이지를\n확인하게 해.\n그다음...',
    },
    'hi': {
        'quantity': 'मात्रा', 'price': 'कीमत',
        'demand_curve': 'मांग वक्र', 'supply_curve': 'आपूर्ति वक्र',
        'capability': 'कार्य के सापेक्ष मॉडल की क्षमता', 'cost': 'लागत',
        'human_steering': 'मानवीय मार्गदर्शन', 'model_cost': 'मॉडल लागत',
        'too_weak': 'बहुत कमजोर', 'just_right': 'बिल्कुल सही', 'overkill': 'अत्यधिक',
        'cheap': 'सस्ता', 'costly': 'महंगा',
        'point': '(कीमत {price}, {quantity} खरीदते हैं। कुल = {net})',
        'sold': '({price} पर {quantity} बिके। कुल = {net})',
        'equilibrium_net': 'संतुलन: {net}',
        'equilibrium_model': 'संतुलन: मॉडल कार्य के लिए\nबिल्कुल सही है',
        'steers_cheap': '(मानव {steering}% रास्ते तक\nमार्गदर्शन करता है। मॉडल सस्ता है)',
        'steers_costly': '(मानव {steering}% रास्ते तक\nमार्गदर्शन करता है। मॉडल महंगा है)',
        'dwl': 'DWL',
        'overkill_prompt': 'हाँ, पुश कर दो',
        'handholding_prompt': 'पंक्तियाँ 100-112 संपादित करो।\nफ़ंक्शन को बदलो ताकि\nवह सिर्फ़ मौजूदा पेज\nके बजाय सभी पेज\nजाँचे।\nफिर...',
    },
    'zh': {
        'quantity': '数量', 'price': '价格',
        'demand_curve': '需求曲线', 'supply_curve': '供给曲线',
        'capability': '模型相对于任务的能力', 'cost': '成本',
        'human_steering': '人类引导', 'model_cost': '模型成本',
        'too_weak': '太弱', 'just_right': '刚刚好', 'overkill': '大材小用',
        'cheap': '便宜', 'costly': '昂贵',
        'point': '（价格 {price}，{quantity} 人购买。总计 = {net}）',
        'sold': '（以 {price} 售出 {quantity} 件。总计 = {net}）',
        'equilibrium_net': '均衡：{net}',
        'equilibrium_model': '均衡：模型刚好\n适合任务',
        'steers_cheap': '（人类引导 {steering}% 的过程。\n模型便宜）',
        'steers_costly': '（人类引导 {steering}% 的过程。\n模型昂贵）',
        'dwl': 'DWL',
        'overkill_prompt': '好，推送吧',
        'handholding_prompt': '编辑第 100-112 行。\n修改函数，\n让它检查所有页面，\n而不只是当前页面。\n然后……',
    },
}


def price_on_demand_curve(quantity):
    return DEMAND_INTERCEPT + DEMAND_SLOPE * quantity


def price_on_supply_curve(quantity):
    return SUPPLY_INTERCEPT + SUPPLY_SLOPE * quantity


def human_steering_share(autonomy):
    return PERCENT_MAX - autonomy


def model_skill_share(autonomy):
    return autonomy


def economics_spec(labels):
    return {
        'x_range': (MIN_QUANTITY, MAX_QUANTITY),
        'y_range': (0, MAX_PRICE),
        'x_ticks': range(MIN_QUANTITY, MAX_QUANTITY + 1),
        'y_ticks': range(0, MAX_PRICE + 1, PRICE_TICK_STEP),
        'first_curve': price_on_demand_curve,
        'second_curve': price_on_supply_curve,
        'xlabel': labels['quantity'],
        'ylabel': labels['price'],
        'first_label': labels['demand_curve'],
        'second_label': labels['supply_curve'],
        'x_tick_labels': None,
        'y_tick_labels': None,
    }


def human_model_spec(labels):
    return {
        'x_range': (0, PERCENT_MAX),
        'y_range': (0, PERCENT_MAX),
        'x_ticks': HUMAN_MODEL_X_TICKS,
        'y_ticks': HUMAN_MODEL_Y_TICKS,
        'first_curve': human_steering_share,
        'second_curve': model_skill_share,
        'xlabel': labels['capability'],
        'ylabel': labels['cost'],
        'first_label': labels['human_steering'],
        'second_label': labels['model_cost'],
        'x_tick_labels': (labels['too_weak'], labels['just_right'], labels['overkill']),
        'y_tick_labels': (labels['cheap'], labels['costly']),
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
        'label_key': 'steers_cheap',
        'text_xy': (3, 58),
        'align': 'left',
    },
    {
        'capability': 80,
        'curve': model_skill_share,
        'label_key': 'steers_costly',
        'text_xy': (97, 58),
        'align': 'right',
    },
]

EXAMPLE_POINTS = [
    {'quantity': 2, 'text_xy': (2.6, 92), 'align': 'left'},
    {'quantity': 5, 'text_xy': (6.0, 50), 'align': 'left'},
    {'quantity': 8, 'text_xy': (7.8, 8), 'align': 'right'},
]


def money(amount):
    # The dollar sign is escaped so matplotlib does not read it as the start of math text
    return f'\\${amount:.0f}'


def point_label(labels, quantity):
    price = price_on_demand_curve(quantity)
    return labels['point'].format(price=money(price), quantity=quantity, net=money(price * quantity))


def draw_curves(ax, bg, fg, spec):
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


def draw_example_points(ax, bg, fg, labels):
    for example in EXAMPLE_POINTS:
        quantity = example['quantity']
        point_xy = (quantity, price_on_demand_curve(quantity))
        draw_labeled_point(ax, bg, fg, point_xy, point_label(labels, quantity), example['text_xy'], example['align'])


def draw_human_model_example_points(ax, bg, fg, labels):
    for example in HUMAN_MODEL_EXAMPLE_POINTS:
        capability = example['capability']
        point_xy = (capability, example['curve'](capability))
        label = labels[example['label_key']].format(steering=f'{human_steering_share(capability):.0f}')
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


def draw_dwl_label(ax, fg, corners, dwl_label):
    ax.text(*triangle_center(corners), dwl_label, ha='center', va='center',
            fontsize=DWL_FONT_SIZE, color=fg, zorder=4)


def draw_dwl_label_with_prompt(ax, fg, corners, dwl_label, prompt):
    center = triangle_center(corners)
    prompt_line_count = prompt.count('\n') + 1
    half_prompt_height = prompt_line_count * PROMPT_FONT_SIZE * PROMPT_LINE_HEIGHT / 2
    ax.text(*center, prompt, ha='center', va='center',
            fontsize=PROMPT_FONT_SIZE, color=fg, zorder=4)
    # Offset in points so the DWL label sits just above the prompt regardless of its line count
    ax.annotate(dwl_label, xy=center, xytext=(0, half_prompt_height + DWL_LABEL_GAP),
                textcoords='offset points', ha='center', va='bottom',
                fontsize=DWL_FONT_SIZE, color=fg, zorder=4)


def draw_human_model_underreliance_triangle(ax, bg, fg, labels):
    equilibrium_corner = (HUMAN_MODEL_EQUILIBRIUM, human_steering_share(HUMAN_MODEL_EQUILIBRIUM))
    human_corner = (UNDERRELIANCE_AUTONOMY, human_steering_share(UNDERRELIANCE_AUTONOMY))
    model_corner = (UNDERRELIANCE_AUTONOMY, model_skill_share(UNDERRELIANCE_AUTONOMY))
    corners = [equilibrium_corner, human_corner, model_corner]
    draw_shaded_triangle(ax, bg, corners, dwl_colormap(UNDERRELIANCE_AUTONOMY, HUMAN_MODEL_EQUILIBRIUM))
    draw_dwl_label_with_prompt(ax, fg, corners, labels['dwl'], labels['handholding_prompt'])


def draw_human_model_equilibrium_point(ax, bg, fg, labels):
    equilibrium_corner = (HUMAN_MODEL_EQUILIBRIUM, human_steering_share(HUMAN_MODEL_EQUILIBRIUM))
    text_xy = (HUMAN_MODEL_EQUILIBRIUM_TEXT_X, equilibrium_corner[1])
    draw_labeled_point(ax, bg, fg, equilibrium_corner, labels['equilibrium_model'], text_xy, 'left')


def draw_human_model_overreliance_triangle(ax, bg, fg, labels):
    equilibrium_corner = (HUMAN_MODEL_EQUILIBRIUM, human_steering_share(HUMAN_MODEL_EQUILIBRIUM))
    human_corner = (OVERRELIANCE_AUTONOMY, human_steering_share(OVERRELIANCE_AUTONOMY))
    model_corner = (OVERRELIANCE_AUTONOMY, model_skill_share(OVERRELIANCE_AUTONOMY))
    corners = [equilibrium_corner, human_corner, model_corner]
    draw_shaded_triangle(ax, bg, corners, dwl_colormap(OVERRELIANCE_AUTONOMY, HUMAN_MODEL_EQUILIBRIUM))
    draw_dwl_label_with_prompt(ax, fg, corners, labels['dwl'], labels['overkill_prompt'])


def draw_deadweight_loss_triangle(ax, bg, fg, labels, scenario):
    traded_quantity = scenario['traded_quantity']
    equilibrium_corner = (EQUILIBRIUM_QUANTITY, price_on_demand_curve(EQUILIBRIUM_QUANTITY))
    traded_demand_corner = (traded_quantity, price_on_demand_curve(traded_quantity))
    traded_supply_corner = (traded_quantity, price_on_supply_curve(traded_quantity))
    corners = [equilibrium_corner, traded_demand_corner, traded_supply_corner]

    draw_shaded_triangle(ax, bg, corners, dwl_colormap(traded_quantity, EQUILIBRIUM_QUANTITY))
    draw_dwl_label(ax, fg, corners, labels['dwl'])

    traded_price = traded_demand_corner[1]
    equilibrium_net = equilibrium_corner[0] * equilibrium_corner[1]
    equilibrium_label = labels['equilibrium_net'].format(net=money(equilibrium_net))
    supply_label = labels['sold'].format(quantity=traded_quantity, price=money(traded_price),
                                         net=money(traded_quantity * traded_price))
    labeled_corners = [
        (traded_demand_corner, point_label(labels, traded_quantity), scenario['demand_label']),
        (equilibrium_corner, equilibrium_label, scenario['equilibrium_label']),
        (traded_supply_corner, supply_label, scenario['supply_label']),
    ]
    for corner, label, (text_xy, align) in labeled_corners:
        draw_labeled_point(ax, bg, fg, corner, label, text_xy, align)


def render(locale, theme, filename_stem, spec, drawing=None):
    is_light = theme == 'light'
    bg = 'white' if is_light else 'black'
    fg = 'black' if is_light else 'white'
    labels = LOCALE_LABELS[locale]

    fig, ax = plt.subplots(figsize=(8, 6), facecolor=bg)
    draw_curves(ax, bg, fg, spec(labels))
    if drawing:
        drawing(ax, bg, fg, labels)

    out_dir = FIGURES_DIR / locale
    out_dir.mkdir(parents=True, exist_ok=True)
    suffix = '-light' if is_light else ''
    plt.tight_layout()
    plt.savefig(out_dir / f'{filename_stem}{suffix}.png', dpi=150, facecolor=bg)
    plt.close(fig)


def dwl_scenario_drawing(scenario):
    return lambda ax, bg, fg, labels: draw_deadweight_loss_triangle(ax, bg, fg, labels, scenario)


def render_all_figures(locale, theme):
    render(locale, theme, 'supply-demand-curves', economics_spec)
    render(locale, theme, 'human-model-curves', human_model_spec, draw_human_model_example_points)
    render(locale, theme, 'human-model-equilibrium', human_model_spec, draw_human_model_equilibrium_point)
    render(locale, theme, 'human-model-underreliance', human_model_spec, draw_human_model_underreliance_triangle)
    render(locale, theme, 'human-model-overreliance', human_model_spec, draw_human_model_overreliance_triangle)
    render(locale, theme, 'supply-demand-equilibrium', economics_spec, draw_example_points)
    for scenario in DWL_SCENARIOS:
        render(locale, theme, scenario['filename_stem'], economics_spec, dwl_scenario_drawing(scenario))


def main():
    for locale in LOCALE_LABELS:
        font = LOCALE_FONTS.get(locale, DEFAULT_FONT)
        for theme in ['dark', 'light']:
            print(f'  {locale}/{theme}')
            with matplotlib.rc_context({'font.family': font}):
                render_all_figures(locale, theme)


main()
