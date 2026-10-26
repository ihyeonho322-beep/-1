(() => {
  'use strict';

  const DATA_URL = '조항데이터.json';

  // index.html을 파일로 직접 열면(file://) 브라우저가 fetch를 막으므로,
  // 그 경우에만 쓰는 조항데이터.json의 사본입니다.
  const FALLBACK_DATA = [
    {
      "조": "제1조",
      "제목": "목적",
      "본문": "이 법은 행정정보의 통합관리와 공동활용에 관한 기본적인 사항을 정함으로써 행정의 효율성과 국민의 편익 증진에 이바지함을 목적으로 한다."
    },
    {
      "조": "제2조",
      "제목": "정의",
      "본문": "이 법에서 사용하는 용어의 뜻은 다음 각 호와 같다.\n1. \"행정정보\"란 「전자정부법」 제2조제6호에 따른 행정정보를 말한다.\n2. \"공동활용\"이란 행정기관 간 행정정보를 상호 제공하여 사용하는 것을 말한다.\n3. \"통합관리\"란 「공공기록물 관리에 관한 법률」 제3조에 따른 기록물의 일부로 행정정보를 통합 관리하는 것을 말한다.\n4. \"데이터 표준\"이란 행정정보의 공동활용을 위한 형식·코드·식별자에 관한 표준을 말한다."
    },
    {
      "조": "제3조",
      "제목": "다른 법률과의 관계",
      "본문": "행정정보의 통합관리 및 공동활용에 관하여 다른 법률에 특별한 규정이 있는 경우를 제외하고는 이 법에서 정하는 바에 따른다. 특히 「개인정보 보호법」, 「공공데이터의 제공 및 이용 활성화에 관한 법률」, 「지능정보화 기본법」에 따른 사항은 해당 법률을 우선 적용한다."
    },
    {
      "조": "제4조",
      "제목": "국가 등의 책무",
      "본문": "국가와 지방자치단체는 행정정보의 통합관리와 공동활용을 위하여 필요한 시책을 수립하여야 한다. 행정안전부장관은 그 시책을 종합적으로 조정하며, 자세한 사항은 대통령령으로 정한다."
    },
    {
      "조": "제5조",
      "제목": "기본계획의 수립",
      "본문": "① 행정안전부장관은 행정정보 통합관리 기본계획을 5년마다 수립하여야 한다.\n② 기본계획에는 다음 각 호의 사항을 포함하여야 한다.\n1. 행정정보 통합관리의 기본방향\n2. 행정정보 공동활용의 활성화 방안\n3. 「전자정부법」 제3조의 행정기관 정보화 시책과의 연계\n4. 그 밖에 대통령령으로 정하는 사항"
    },
    {
      "조": "제6조",
      "제목": "시행계획의 수립",
      "본문": "행정기관의 장은 매년 시행계획을 수립하여야 하며, 그 결과를 행정안전부장관에게 보고하여야 한다. 시행계획의 형식과 절차는 대통령령으로 정한다."
    },
    {
      "조": "제7조",
      "제목": "공동활용 협의회",
      "본문": "행정정보 공동활용에 관한 사항을 협의하기 위하여 행정안전부에 행정정보 공동활용 협의회를 둔다. 협의회의 구성과 운영에 필요한 사항은 대통령령으로 정한다."
    },
    {
      "조": "제8조",
      "제목": "공동활용 신청",
      "본문": "행정기관의 장은 다른 행정기관이 보유한 행정정보를 활용하려는 경우에는 행정안전부장관에게 신청하여야 한다."
    },
    {
      "조": "제9조",
      "제목": "공동활용 승인",
      "본문": "행정안전부장관은 신청을 받은 경우 「개인정보 보호법」 제17조에 따른 절차를 거쳐 30일 이내에 승인 여부를 결정하여야 한다."
    },
    {
      "조": "제10조",
      "제목": "보안 조치",
      "본문": "공동활용 시 행정정보의 안전성 확보를 위하여 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 및 「개인정보 보호법」에서 정하는 보안 조치를 적용하여야 한다."
    },
    {
      "조": "제11조",
      "제목": "데이터 표준",
      "본문": "행정안전부장관은 데이터 표준을 정하여 고시할 수 있다. 데이터 표준의 적용 범위와 시기는 대통령령으로 정한다."
    },
    {
      "조": "제12조",
      "제목": "표준 적용 의무",
      "본문": "행정기관은 행정정보를 생산·관리·활용할 때 제11조에 따른 데이터 표준을 따라야 한다."
    },
    {
      "조": "제13조",
      "제목": "실태조사",
      "본문": "행정안전부장관은 매년 행정정보 통합관리 실태를 조사하여 그 결과를 공개한다."
    },
    {
      "조": "제14조",
      "제목": "과태료",
      "본문": "다음 각 호의 어느 하나에 해당하는 자에게는 1천만원 이하의 과태료를 부과한다.\n1. 제8조를 위반하여 승인 없이 공동활용한 자\n2. 제12조에 따른 데이터 표준을 정당한 사유 없이 위반한 자"
    },
    {
      "조": "제15조",
      "제목": "시행일",
      "본문": "이 법은 2026년 7월 1일부터 시행한다."
    }
  ];

  const $ = (sel) => document.querySelector(sel);
  const input = $('#search');
  const clearBtn = $('#clear');
  const cardsEl = $('#cards');
  const countEl = $('#count');
  const emptyEl = $('#empty');
  const emptyQuery = $('#emptyQuery');
  const resetBtn = $('#reset');
  const sourceEl = $('#source');

  let articles = [];

  const normalize = (s) => String(s).normalize('NFC').toLowerCase();
  const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  function el(tag, className) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    return node;
  }

  // 검색어와 일치하는 부분을 <mark>로 감싼 DocumentFragment를 만든다.
  function highlight(text, re) {
    const frag = document.createDocumentFragment();
    if (!re) {
      frag.append(text);
      return frag;
    }
    text.split(re).forEach((part, i) => {
      if (part === '') return;
      if (i % 2 === 1) {
        const m = el('mark');
        m.textContent = part;
        frag.append(m);
      } else {
        frag.append(part);
      }
    });
    return frag;
  }

  function prepare(raw) {
    return raw.map((a) => {
      const no = String(a['조'] ?? '');
      const title = String(a['제목'] ?? '');
      const body = String(a['본문'] ?? '');
      return {
        no,
        title,
        lines: body.split(/\r?\n/).filter((l) => l.trim() !== ''),
        haystack: normalize(`${no} ${title} ${body}`),
      };
    });
  }

  const PARA = /^([①-⑳])\s*(.*)$/;   // ① ② … 항
  const ITEM = /^(\d+\.)\s*(.*)$/;    // 1. 2. … 호

  function buildLine(text, re) {
    const p = el('p');
    const m = text.match(PARA) || text.match(ITEM);
    if (!m) {
      p.append(highlight(text, re));
      return p;
    }
    p.className = PARA.test(text) ? 'line' : 'line item';
    const no = el('span', 'no');
    no.append(highlight(m[1], re));
    const body = el('span');
    body.append(highlight(m[2], re));
    p.append(no, body);
    return p;
  }

  function buildCard(a, re) {
    const card = el('article', 'card');
    const head = el('header', 'card-head');
    const no = el('span', 'article-no');
    no.append(highlight(a.no, re));
    const title = el('h2', 'card-title');
    title.append(highlight(a.title, re));
    head.append(no, title);

    const body = el('div', 'card-body');
    a.lines.forEach((line) => body.append(buildLine(line, re)));

    card.append(head, body);
    return card;
  }

  function render() {
    const query = input.value.normalize('NFC').trim();
    const terms = query.split(/\s+/).filter(Boolean);   // 공백으로 나누면 모두 포함(AND)
    const re = terms.length
      ? new RegExp('(' + [...terms].sort((a, b) => b.length - a.length).map(escapeRegExp).join('|') + ')', 'gi')
      : null;
    const lowered = terms.map((t) => t.toLowerCase());
    const list = lowered.length
      ? articles.filter((a) => lowered.every((t) => a.haystack.includes(t)))
      : articles;

    cardsEl.replaceChildren(...list.map((a) => buildCard(a, re)));

    const strong = el('strong');
    strong.textContent = list.length;
    countEl.replaceChildren('현재 ', strong, `개 조항 표시 (전체 ${articles.length}개)`);
    if (query) countEl.append(` · “${query}” 검색`);

    emptyEl.hidden = list.length > 0;
    emptyQuery.textContent = `“${query}”`;
    clearBtn.hidden = input.value === '';
  }

  function clearSearch() {
    input.value = '';
    render();
    input.focus();
  }

  async function loadData() {
    try {
      const res = await fetch(DATA_URL, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (!Array.isArray(json)) throw new Error('JSON 최상위가 배열이 아닙니다.');
      return { data: json, fromFile: true };
    } catch (err) {
      console.warn(`${DATA_URL}을(를) 불러오지 못해 내장 사본을 사용합니다:`, err);
      return { data: FALLBACK_DATA, fromFile: false };
    }
  }

  input.addEventListener('input', render);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && input.value) clearSearch();
  });
  clearBtn.addEventListener('click', clearSearch);
  resetBtn.addEventListener('click', clearSearch);

  loadData().then(({ data, fromFile }) => {
    articles = prepare(data);
    sourceEl.textContent = fromFile
      ? `데이터: ${DATA_URL}`
      : `데이터: 내장 사본 (${DATA_URL}을 읽지 못함. 로컬 서버로 열면 파일을 직접 읽습니다.)`;
    render();
  });
})();
