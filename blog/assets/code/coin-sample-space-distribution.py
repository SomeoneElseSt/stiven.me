import matplotlib
import matplotlib.pyplot as plt
import numpy as np
from pathlib import Path
from scipy.special import comb

NUM_FLIPS = 100
ASSETS_DIR = Path(__file__).resolve().parent.parent / "figures"

LOCALE_FONTS = {
    'ja': 'Hiragino Sans',
    'ko': 'Apple SD Gothic Neo',
    'zh': 'Songti SC',
    'hi': 'Kohinoor Devanagari',
}

LOCALE_LABELS = {
    'en': {
        'xlabel': 'Number of Coin Flips (n)',
        'ylabel': 'Proportion of Heads',
        'title': 'Proportion of Heads in the Sample Space\nA Normal Distribution Emerges Naturally',
        'legend': 'Mean (50% heads)',
        'colorbar': 'Relative Probability Density',
    },
    'es': {
        'xlabel': 'Número de lanzamientos (n)',
        'ylabel': 'Proporción de caras',
        'title': 'Proporción de caras en el espacio muestral\nUna distribución normal emerge naturalmente',
        'legend': 'Media (50% caras)',
        'colorbar': 'Densidad de probabilidad relativa',
    },
    'de': {
        'xlabel': 'Anzahl der Münzwürfe (n)',
        'ylabel': 'Anteil der Köpfe',
        'title': 'Anteil der Köpfe im Stichprobenraum\nEine Normalverteilung entsteht natürlich',
        'legend': 'Mittelwert (50% Köpfe)',
        'colorbar': 'Relative Wahrscheinlichkeitsdichte',
    },
    'fr': {
        'xlabel': 'Nombre de lancers (n)',
        'ylabel': 'Proportion de faces',
        'title': "Proportion de faces dans l'espace des résultats\nUne distribution normale émerge naturellement",
        'legend': 'Moyenne (50% faces)',
        'colorbar': 'Densité de probabilité relative',
    },
    'pt': {
        'xlabel': 'Número de lançamentos (n)',
        'ylabel': 'Proporção de caras',
        'title': 'Proporção de caras no espaço amostral\nUma distribuição normal emerge naturalmente',
        'legend': 'Média (50% caras)',
        'colorbar': 'Densidade de probabilidade relativa',
    },
    'pl': {
        'xlabel': 'Liczba rzutów (n)',
        'ylabel': 'Odsetek orłów',
        'title': 'Odsetek orłów w przestrzeni próbkowania\nNaturalnie pojawia się rozkład normalny',
        'legend': 'Średnia (50% orłów)',
        'colorbar': 'Względna gęstość prawdopodobieństwa',
    },
    'ja': {
        'xlabel': 'コイン投げ回数 (n)',
        'ylabel': '表の割合',
        'title': '標本空間における表の割合\n正規分布が自然に現れる',
        'legend': '平均（表 50%）',
        'colorbar': '相対的確率密度',
    },
    'ko': {
        'xlabel': '동전 던지기 횟수 (n)',
        'ylabel': '앞면의 비율',
        'title': '표본 공간에서 앞면의 비율\n정규분포가 자연스럽게 나타남',
        'legend': '평균 (앞면 50%)',
        'colorbar': '상대적 확률 밀도',
    },
    'hi': {
        'xlabel': 'सिक्का उछाल की संख्या (n)',
        'ylabel': 'चित का अनुपात',
        'title': 'नमूना स्थान में चित का अनुपात\nएक सामान्य वितरण स्वाभाविक रूप से उभरता है',
        'legend': 'माध्य (50% चित)',
        'colorbar': 'सापेक्ष प्रायिकता घनत्व',
    },
    'zh': {
        'xlabel': '硬币投掷次数 (n)',
        'ylabel': '正面比例',
        'title': '样本空间中正面的比例\n正态分布自然涌现',
        'legend': '均值（正面 50%）',
        'colorbar': '相对概率密度',
    },
}


def render(locale, theme, labels):
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

            ax.scatter(flip, y_proportion, c=[color], s=marker_size,
                       marker='s', edgecolors='none', alpha=0.95, rasterized=True)

    ax.axhline(y=0.5, color=fg, linestyle='--', linewidth=3, alpha=0.9,
               label=labels['legend'], zorder=10)

    for flip in [10, 25, 50, 75, 100]:
        std_dev = np.sqrt(flip * 0.5 * 0.5)
        std_proportion = std_dev / flip
        ax.plot([flip, flip], [0.5 - std_proportion, 0.5 + std_proportion],
                'yellow', linewidth=5, alpha=0.8, zorder=9)
        ax.plot([flip, flip], [0.5 - 2 * std_proportion, 0.5 + 2 * std_proportion],
                'orange', linewidth=3, alpha=0.6, zorder=8)

    ax.set_xlim(0, NUM_FLIPS + 2)
    ax.set_ylim(0, 1)
    ax.set_xlabel(labels['xlabel'], fontsize=16, fontweight='bold', color=fg)
    ax.set_ylabel(labels['ylabel'], fontsize=16, fontweight='bold', color=fg)
    ax.set_title(labels['title'], fontsize=17, fontweight='bold', pad=20, color=fg)

    sm = plt.cm.ScalarMappable(cmap=plt.cm.RdYlBu_r, norm=plt.Normalize(vmin=0, vmax=1))
    sm.set_array([])
    cbar = plt.colorbar(sm, ax=ax, pad=0.01, fraction=0.046)
    cbar.set_label(labels['colorbar'], fontsize=14, fontweight='bold', color=fg)
    cbar.ax.yaxis.set_tick_params(color=fg)
    plt.setp(plt.getp(cbar.ax.axes, 'yticklabels'), color=fg)

    ax.legend(loc='upper right', fontsize=13, framealpha=0.9)
    ax.tick_params(colors=fg)
    for spine in ax.spines.values():
        spine.set_color(fg)

    out_dir = ASSETS_DIR / locale
    out_dir.mkdir(exist_ok=True)
    suffix = '-light' if is_light else ''
    plt.tight_layout()
    plt.savefig(out_dir / f'coin-sample-space-proportion-heads{suffix}.png',
                dpi=150, bbox_inches='tight', facecolor=bg)
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
