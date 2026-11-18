(function () {
  const B = window.BDA, el = B.el, G = B.G;
  const topics = window.BDA_MAP.units.filter(unit => G.chapters(unit.id).length);
  const params = new URLSearchParams(location.search);
  const main = document.getElementById("topics");
  const status = document.getElementById("topic-status");

  function link(label, href) {
    const a = el("a", "", label);
    a.href = href;
    return a;
  }

  function topicLink(unit) {
    return link(unit.title, "topics.html?u=" + unit.id);
  }

  function directory(unknown) {
    const search = el("input", "topic-search");
    const label = el("label", "", "주제 검색");
    search.type = "search";
    search.id = "topic-search";
    label.htmlFor = search.id;
    search.placeholder = "예) 판다스, 조건부확률, Q-learning";
    main.insertBefore(label, status);
    main.insertBefore(search, status);
    const groups = window.BDA_MAP.areas.map(area => {
      const detail = el("details", "area-block topic-group");
      detail.append(el("summary", "", area.name));
      const items = topics.filter(unit => unit.area === area.code).map(unit => {
        const href = topicLink(unit);
        href.title = unit.concepts;
        const row = el("div", "urow on");
        row.append(el("span", "uid", unit.id), href);
        detail.append(row);
        return { row, text: [area.name, unit.id, unit.title, unit.concepts, ...G.chapters(unit.id).map(ch => ch.title)].join(" ").toLowerCase() };
      });
      main.append(detail);
      return { detail, items };
    });
    function filter() {
      const tokens = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      let found = 0;
      for (const { detail, items } of groups) {
        let matches = 0;
        for (const { row, text } of items) {
          const shown = tokens.every(token => text.includes(token));
          row.hidden = !shown;
          if (shown) matches++;
        }
        detail.hidden = matches === 0;
        detail.open = !!tokens.length && matches > 0;
        found += matches;
      }
      status.textContent = found ? found + "개 주제" : "일치하는 주제가 없습니다.";
    }
    search.addEventListener("input", filter);
    search.value = params.get("q") || "";
    filter();
    if (unknown) status.textContent = "등록된 주제가 아닙니다. 아래에서 주제를 찾아보세요.";
  }

  function slide(title, variant = "") {
    const section = el("section", ("slide topic-slide " + variant).trim());
    section.append(el(variant === "cover-slide" ? "h1" : "h2", "", title));
    return section;
  }

  function chapterLink(chapter, label = "본문 읽기") {
    return link(label, B.BASE + chapter.href);
  }

  function figureSlide(title, figure, chapter) {
    const section = slide(title);
    const zoom = el("button", "tool topic-zoom", "그림 확대");
    zoom.type = "button";
    zoom.setAttribute("aria-pressed", "false");
    zoom.onclick = () => {
      const enlarged = figure.classList.toggle("zoomed");
      zoom.setAttribute("aria-pressed", String(enlarged));
      zoom.textContent = enlarged ? "그림 크기 맞추기" : "그림 확대";
      if (enlarged) figure.tabIndex = 0;
      else figure.removeAttribute("tabindex");
    };
    // 본문 기본 화살표는 페이지에서 공유한다. 각 그림이 정의한 자원은 그림 안에서만 참조한다.
    figure.querySelectorAll("[id]").forEach(node => {
      const old = node.id;
      const id = chapter.id + "-" + sectionFigureNumber++ + "-" + old;
      node.id = id;
      figure.querySelectorAll("*").forEach(target => {
        for (const { name, value } of Array.from(target.attributes)) {
          if (value === "#" + old || value.includes("url(#" + old + ")")) {
            const replacement = value === "#" + old ? "#" + id : value.replaceAll("url(#" + old + ")", "url(#" + id + ")");
            target.setAttribute(name, replacement);
          }
        }
      });
    });
    section.append(figure, zoom, chapterLink(chapter));
    return section;
  }
  let sectionFigureNumber = 0;

  const sentences = new Intl.Segmenter("ko", { granularity: "sentence" });
  function concise(paragraph, chapter) {
    const sentence = Array.from(sentences.segment(paragraph.textContent))
      .filter(item => item.segment.trim().length >= 12 && item.segment.trim().length <= 180);
    const key = paragraph.querySelector(".key")?.textContent.trim();
    const selected = (key && sentence.find(item => item.segment.includes(key))) || sentence[0];
    if (!selected) return null;
    // Keep subscripts, superscripts, and code notation from the original sentence.
    const range = paragraph.ownerDocument.createRange();
    const walker = paragraph.ownerDocument.createTreeWalker(paragraph, NodeFilter.SHOW_TEXT);
    const finish = selected.index + selected.segment.length;
    let offset = 0, started = false;
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const end = offset + node.length;
      if (!started && selected.index <= end) {
        range.setStart(node, selected.index - offset);
        started = true;
      }
      if (finish <= end) {
        range.setEnd(node, finish - offset);
        const content = range.cloneContents();
        content.querySelectorAll("a[href]").forEach(a => {
          a.href = new URL(a.getAttribute("href"), B.BASE + chapter.href);
        });
        return content;
      }
      offset = end;
    }
    return null;
  }

  async function readChapter(chapter) {
    const response = await fetch(B.BASE + chapter.href);
    if (!response.ok) throw new Error(chapter.id);
    const page = new DOMParser().parseFromString(await response.text(), "text/html");
    const source = page.querySelector("main.page");
    if (!source || page.body.dataset.note !== chapter.id) throw new Error(chapter.id);
    return source;
  }

  function chapterSlides(chapter, source) {
    const sections = [];
    let part = { title: chapter.title, elements: [] };
    sections.push(part);
    for (const element of source.children) {
      if (element.matches("h2, h3")) {
        part = { title: element.textContent.trim(), elements: [] };
        sections.push(part);
      } else part.elements.push(element);
    }

    const out = [];
    const pairedOutputs = new Set();
    let questions = 0;
    for (const { title, elements } of sections) {
      if (/^(참고 자료|참고문헌|확인 문제|연습 문제|더 읽기|출처)/.test(title)) continue;
      const before = out.length;
      const downloads = elements.flatMap(node => Array.from(node.querySelectorAll("a[download]")));
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.matches("figure.fig")) {
          out.push(figureSlide(title, element, chapter));
        } else if (element.matches("pre[data-example]")) {
          const example = slide(title, "topic-example");
          const nextCode = elements.findIndex((node, j) => j > i && node.matches("pre[data-example]"));
          const outputs = elements.slice(i + 1, nextCode < 0 ? undefined : nextCode).filter(node => node.matches("pre[data-output]"));
          example.append(el("p", "label", "실행 코드"), element);
          for (const output of outputs) {
            example.append(el("p", "label", "실행 결과"), output);
            pairedOutputs.add(output);
          }
          for (const a of downloads) {
            const file = link(a.textContent, new URL(a.getAttribute("href"), B.BASE + chapter.href));
            file.setAttribute("download", "");
            example.append(file);
          }
          example.append(chapterLink(chapter));
          out.push(example);
        } else if (element.matches("pre[data-output]") && !pairedOutputs.has(element)) {
          const output = slide(title, "topic-example");
          output.append(el("p", "label", "실행 결과 예시"), element, chapterLink(chapter));
          out.push(output);
        }
      }

      if (out.length === before && title !== chapter.title) {
        const paragraphs = elements.filter(node => node.matches("p"));
        const paragraph = paragraphs.find(node => node.querySelector(".key")) || paragraphs[0];
        const content = paragraph && concise(paragraph, chapter);
        if (content) {
          const theory = slide(title);
          const text = el("p", "say");
          text.append(content);
          theory.append(text, chapterLink(chapter));
          out.push(theory);
        }
      }

      const check = elements.find(node => node.matches(".check[data-q]"));
      if (check && questions < 2 && out.length > before) {
        out.push(questionSlide(title, chapter, check.dataset.q));
        questions++;
      }
    }

    if (!questions) {
      const check = source.querySelector(".check[data-q]");
      if (check) out.push(questionSlide(chapter.title, chapter, check.dataset.q));
    }
    return out;
  }

  function questionSlide(title, chapter, question) {
    const section = slide("잠깐, 직접", "check-slide");
    const check = el("div", "check");
    check.dataset.chapter = chapter.id;
    check.dataset.question = question;
    section.append(el("p", "say", title), check);
    return section;
  }

  async function showTopic(unit) {
    const chapters = G.chapters(unit.id);
    document.title = unit.title + " · 주제별 슬라이드";
    document.getElementById("topic-crumb").replaceChildren(link("주제별 슬라이드", "topics.html"));
    try {
      const docs = await Promise.all(chapters.map(readChapter));
      const cover = slide(unit.title, "cover-slide");
      cover.prepend(el("p", "deck-no", G.area(unit.area).name));
      const ordered = el("ol", "topic-chapters");
      cover.append(ordered);
      const slides = [cover];
      chapters.forEach((chapter, i) => {
        const entry = el("li");
        entry.append(link(chapter.title, "#" + (slides.length + 1)));
        ordered.append(entry);
        slides.push(...chapterSlides(chapter, docs[i]));
      });
      const recap = slide("다시 보기");
      const originals = el("ul", "topic-chapters");
      chapters.forEach(chapter => {
        const item = el("li");
        item.append(chapterLink(chapter, chapter.title));
        originals.append(item);
      });
      recap.append(originals);
      const nextTopic = topics.slice(topics.indexOf(unit) + 1).find(candidate => candidate.area === unit.area);
      if (nextTopic) {
        const next = topicLink(nextTopic);
        next.textContent += " →";
        const row = el("p", "deck-end");
        row.append(next);
        recap.append(row);
      }
      slides.push(recap);

      document.body.classList.add("deck-body");
      main.className = "deck topic-deck";
      main.replaceChildren(...slides);
      document.dispatchEvent(new Event("deckready"));
      B.loadQuiz(chapters.map(chapter => chapter.id), () => {
        main.querySelectorAll("[data-question]").forEach(check => {
          const note = check.dataset.chapter;
          const quiz = (B.QUIZ[note] || []).find(q => q.id === check.dataset.question);
          if (quiz) B.renderQ(check, note, quiz);
          else check.textContent = "이 확인 문제를 불러오지 못했습니다.";
        });
      });
    } catch {
      status.textContent = "슬라이드를 불러오지 못했습니다.";
      const retry = link("다시 시도", location.href);
      const list = el("ul", "topic-chapters");
      chapters.forEach(chapter => {
        const item = el("li");
        item.append(chapterLink(chapter, chapter.title));
        list.append(item);
      });
      main.append(retry, list);
    }
  }

  const id = params.get("u");
  const unit = topics.find(topic => topic.id === id);
  if (unit) showTopic(unit);
  else directory(id !== null);
})();
