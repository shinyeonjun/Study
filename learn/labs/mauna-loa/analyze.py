"""1990–2019년 마우나로아 CO₂ 연평균의 기술 분석.

자료: NOAA Global Monitoring Laboratory 및 Scripps Institution of Oceanography.
https://gml.noaa.gov/ccgg/trends/data.html
"""

from pathlib import Path

import matplotlib
import numpy as np
import pandas as pd

matplotlib.use("Agg")
from matplotlib import pyplot as plt


def read_annual(path):
    expected = ["year", "mean_ppm", "uncertainty_ppm"]
    data = pd.read_csv(path, dtype={"year": "Int64"})
    if list(data.columns) != expected:
        raise ValueError("CSV 열 이름과 순서를 확인하세요.")
    if data.isna().any().any():
        raise ValueError("연도·농도·불확실성 중 비어 있는 값이 있습니다.")
    if data["year"].duplicated().any():
        raise ValueError("같은 연도의 기록이 여러 줄입니다.")
    for name in ("mean_ppm", "uncertainty_ppm"):
        data[name] = pd.to_numeric(data[name], errors="raise")
        if not np.isfinite(data[name].to_numpy()).all():
            raise ValueError(f"{name}에 유한한 수가 아닌 값이 있습니다.")
    if data["mean_ppm"].le(0).any() or data["uncertainty_ppm"].lt(0).any():
        raise ValueError("농도는 양수, 불확실성은 0 이상이어야 합니다.")
    data = data.sort_values("year", ignore_index=True)
    if data["year"].tolist() != list(range(1990, 2020)):
        raise ValueError("1990년부터 2019년까지 연도별로 한 줄씩 필요합니다.")
    return data


def summarize(data):
    decade = data["year"] // 10 * 10
    return data.groupby(decade, sort=True).agg(
        years=("mean_ppm", "size"),
        mean_ppm=("mean_ppm", "mean"),
        median_ppm=("mean_ppm", "median"),
        sample_sd_ppm=("mean_ppm", "std"),
        min_ppm=("mean_ppm", "min"),
        max_ppm=("mean_ppm", "max"),
    ).rename_axis("decade")


def main():
    source = Path(__file__).with_name("annual_co2.csv")
    data = read_annual(source)
    summary = summarize(data)
    print(f"years={len(data)}, gaps={data['year'].diff().dropna().ne(1).sum()}")
    print(summary.to_string(float_format=lambda x: f"{x:.3f}"))

    change = data["mean_ppm"].diff()
    total = data["mean_ppm"].iloc[-1] - data["mean_ppm"].iloc[0]
    print(f"total_change_ppm={total:.2f}")
    print(f"intervals={change.count()}, mean_change_ppm_per_year={change.mean():.2f}")
    print(f"largest_change_year={data.loc[change.idxmax(), 'year']}")

    report = Path("co2_report")
    report.mkdir(exist_ok=True)
    summary.to_csv(report / "decade_summary.csv", float_format="%.3f")

    fig, (top, bottom) = plt.subplots(2, 1, figsize=(8, 7), sharex=True, layout="constrained")
    top.plot(data["year"], data["mean_ppm"], color="#225990", marker="o", markersize=3)
    top.set(ylabel="Annual mean (ppm)", title="Mauna Loa CO2, 1990–2019")
    top.grid(axis="y", alpha=0.25)
    bottom.bar(data["year"].iloc[1:], change.iloc[1:], color="#476e57")
    bottom.set(xlabel="Year", ylabel="Change from prior year (ppm)")
    bottom.grid(axis="y", alpha=0.25)
    fig.savefig(report / "annual_and_changes.png", dpi=150)
    plt.close(fig)
    print("saved: co2_report/decade_summary.csv, co2_report/annual_and_changes.png")


if __name__ == "__main__":
    main()
