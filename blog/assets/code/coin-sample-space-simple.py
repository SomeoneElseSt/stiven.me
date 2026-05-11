import matplotlib
import matplotlib.pyplot as plt
import numpy as np
from pathlib import Path

NUM_FLIPS = 6
ASSETS_DIR = Path(__file__).resolve().parent.parent / "figures"

LOCALE_FONTS = {
    'ja': 'Hiragino Sans',
    'ko': 'Apple SD Gothic Neo',
    'zh': 'Songti SC',
    'hi': 'Kohinoor Devanagari',
}

LOCALE_LABELS = {
    'en': {
        'xlabel': 'Coin Flip Number',
        'ylabel': 'Probability space (0–1)',
        'title': 'Sample Space Division: 6 Coin Flips\n(Total outcomes = 2^6 = 64)',
        'H': 'H', 'T': 'T',
    },
    'es': {
        'xlabel': 'Número de lanzamiento',
        'ylabel': 'Espacio de probabilidad (0–1)',
        'title': 'División del espacio muestral: 6 lanzamientos\n(Resultados totales = 2^6 = 64)',
        'H': 'C', 'T': 'S',
    },
    'de': {
        'xlabel': 'Münzwurf-Nummer',
        'ylabel': 'Wahrscheinlichkeitsraum (0–1)',
        'title': 'Stichprobenraum-Aufteilung: 6 Münzwürfe\n(Gesamtergebnisse = 2^6 = 64)',
        'H': 'K', 'T': 'Z',
    },
    'fr': {
        'xlabel': 'Numéro de lancer',
        'ylabel': 'Espace de probabilité (0–1)',
        'title': "Division de l'espace des résultats : 6 lancers\n(Résultats totaux = 2^6 = 64)",
        'H': 'F', 'T': 'P',
    },
    'pt': {
        'xlabel': 'Número do lançamento',
        'ylabel': 'Espaço de probabilidade (0–1)',
        'title': 'Divisão do espaço amostral: 6 lançamentos\n(Resultados totais = 2^6 = 64)',
        'H': 'C', 'T': 'R',
    },
    'pl': {
        'xlabel': 'Numer rzutu',
        'ylabel': 'Przestrzeń prawdopodobieństwa (0–1)',
        'title': 'Podział przestrzeni próbkowania: 6 rzutów\n(Łączne wyniki = 2^6 = 64)',
        'H': 'O', 'T': 'R',
    },
    'ja': {
        'xlabel': 'コイン投げ回数',
        'ylabel': '確率空間 (0–1)',
        'title': '標本空間の分割：6回のコイン投げ\n（総結果数 = 2^6 = 64）',
        'H': '表', 'T': '裏',
    },
    'ko': {
        'xlabel': '동전 던지기 횟수',
        'ylabel': '확률 공간 (0–1)',
        'title': '표본 공간 분할: 동전 6번 던지기\n（총 경우의 수 = 2^6 = 64）',
        'H': '앞', 'T': '뒤',
    },
    'hi': {
        'xlabel': 'सिक्का उछाल संख्या',
        'ylabel': 'प्रायिकता स्थान (0–1)',
        'title': 'नमूना स्थान विभाजन: 6 सिक्का उछाल\n(कुल परिणाम = 2^6 = 64)',
        'H': 'च', 'T': 'प',
    },
    'zh': {
        'xlabel': '硬币投掷次数',
        'ylabel': '概率空间 (0–1)',
        'title': '样本空间划分：6次硬币投掷\n（总结果数 = 2^6 = 64）',
        'H': '正', 'T': '反',
    },
}


def outcome_to_sequence(outcome, length, h_char, t_char):
    if length == 0:
        return ''
    bits = format(outcome, f'0{length}b')
    return ''.join(h_char if bit == '1' else t_char for bit in bits)


def render(locale, theme, labels):
    is_light = theme == 'light'
    bg = 'white' if is_light else 'black'
    fg = 'black' if is_light else 'white'

    fig, ax = plt.subplots(figsize=(14, 8), facecolor=bg)
    ax.set_facecolor(bg)

    colors = plt.cm.Blues(np.linspace(0.3, 0.9, NUM_FLIPS + 1))
    h_char = labels['H']
    t_char = labels['T']

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
                label = outcome_to_sequence(outcome, flip, h_char, t_char)
                ax.text(flip + 0.4, y_position + height / 2, label,
                        ha='center', va='center', fontsize=8)

    ax.set_xlim(-0.5, NUM_FLIPS + 0.5)
    ax.set_ylim(0, 1)
    ax.set_xlabel(labels['xlabel'], fontsize=12, color=fg)
    ax.set_ylabel(labels['ylabel'], fontsize=12, color=fg)
    ax.set_title(labels['title'], fontsize=14, color=fg)
    ax.set_xticks(range(NUM_FLIPS + 1))
    ax.grid(axis='x', alpha=0.3, color=fg)
    ax.tick_params(colors=fg)
    for spine in ax.spines.values():
        spine.set_color(fg)

    out_dir = ASSETS_DIR / locale
    out_dir.mkdir(exist_ok=True)
    suffix = '-light' if is_light else ''
    plt.tight_layout()
    plt.savefig(out_dir / f'coin-sample-space-n-6{suffix}.png', dpi=150, facecolor=bg)
    plt.close(fig)


def generate(locale, theme):
    font = LOCALE_FONTS.get(locale, 'DejaVu Sans')
    with matplotlib.rc_context({'font.family': font}):
        render(locale, theme, LOCALE_LABELS[locale])


def main():
    for locale in LOCALE_LABELS:
        for theme in ['dark', 'light']:
            print(f'  {locale}/{theme}')
            generate(locale, theme)


main()
