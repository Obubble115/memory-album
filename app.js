const sixGods = [
  {
    name: "大安",
    direction: "东方或东南方",
    tone: "物品多半未远离原处，宜静中细找。",
    timing: "当天或次日较易有眉目。",
    hint: "桌面、柜边、门口、常用位置、平稳处。",
  },
  {
    name: "留连",
    direction: "西南方或角落处",
    tone: "事情拖滞，物品容易被压住、夹住或遗忘在半路。",
    timing: "需要反复查找，三日内更有机会。",
    hint: "抽屉、包夹层、衣物下、座位缝、转角。",
  },
  {
    name: "速喜",
    direction: "南方或明亮处",
    tone: "有较快消息，常与人、柜台、消息提醒有关。",
    timing: "先找最近去过的公开场所。",
    hint: "前台、收银处、餐桌边、消息记录、失物招领。",
  },
  {
    name: "赤口",
    direction: "西方或金属物附近",
    tone: "容易有口舌、误拿、争执或被锐利物遮挡的象。",
    timing: "先问人，再翻找，别急躁。",
    hint: "金属架、车内、工具旁、门锁边、同事同学处。",
  },
  {
    name: "小吉",
    direction: "北方或近水处",
    tone: "有可寻之象，常由熟人、路过者或小线索带回。",
    timing: "一到两天内留意反馈。",
    hint: "洗手台、饮水区、包内小袋、熟人处、低处。",
  },
  {
    name: "空亡",
    direction: "西北方或空旷处",
    tone: "线索散，可能已经离开原处，或记忆中的位置有误。",
    timing: "要扩大范围，并做现实补救。",
    hint: "垃圾桶附近、公共区域、交通工具、遗失路线后段。",
  },
];

const trigramMap = {
  qian: { name: "乾", element: "金", direction: "西北", image: "高处、金属、圆形、父亲或负责人" },
  dui: { name: "兑", element: "金", direction: "西", image: "缺口、口袋、柜台、少女或服务人员" },
  li: { name: "离", element: "火", direction: "南", image: "明亮处、电子设备、证件、眼睛可见处" },
  zhen: { name: "震", element: "木", direction: "东", image: "动处、门边、车上、刚移动过的位置" },
  xun: { name: "巽", element: "木", direction: "东南", image: "缝隙、风口、包袋、长形物附近" },
  kan: { name: "坎", element: "水", direction: "北", image: "低处、水边、暗处、危险或遗失感强" },
  gen: { name: "艮", element: "土", direction: "东北", image: "停止处、墙角、柜子、山形堆叠处" },
  kun: { name: "坤", element: "土", direction: "西南", image: "地面、布包、母亲或年长女性、杂物堆" },
};

const trigramOrder = ["qian", "dui", "li", "zhen", "xun", "kan", "gen", "kun"];

const hexagramNames = {
  "qian-qian": "乾为天",
  "kun-kun": "坤为地",
  "kan-zhen": "水雷屯",
  "gen-kan": "山水蒙",
  "kan-qian": "水天需",
  "qian-kan": "天水讼",
  "kun-kan": "地水师",
  "kan-kun": "水地比",
  "xun-qian": "风天小畜",
  "qian-dui": "天泽履",
  "kun-qian": "地天泰",
  "qian-kun": "天地否",
  "qian-li": "天火同人",
  "li-qian": "火天大有",
  "kun-gen": "地山谦",
  "zhen-kun": "雷地豫",
  "dui-zhen": "泽雷随",
  "gen-xun": "山风蛊",
  "kun-dui": "地泽临",
  "xun-kun": "风地观",
  "li-zhen": "火雷噬嗑",
  "gen-li": "山火贲",
  "gen-kun": "山地剥",
  "kun-zhen": "地雷复",
  "qian-zhen": "天雷无妄",
  "gen-qian": "山天大畜",
  "gen-zhen": "山雷颐",
  "dui-xun": "泽风大过",
  "kan-kan": "坎为水",
  "li-li": "离为火",
  "dui-gen": "泽山咸",
  "zhen-xun": "雷风恒",
  "qian-gen": "天山遁",
  "zhen-qian": "雷天大壮",
  "li-kun": "火地晋",
  "kun-li": "地火明夷",
  "xun-li": "风火家人",
  "li-dui": "火泽睽",
  "kan-gen": "水山蹇",
  "zhen-kan": "雷水解",
  "gen-dui": "山泽损",
  "xun-zhen": "风雷益",
  "dui-qian": "泽天夬",
  "qian-xun": "天风姤",
  "dui-kun": "泽地萃",
  "kun-xun": "地风升",
  "dui-kan": "泽水困",
  "kan-xun": "水风井",
  "dui-li": "泽火革",
  "li-xun": "火风鼎",
  "zhen-zhen": "震为雷",
  "gen-gen": "艮为山",
  "xun-gen": "风山渐",
  "zhen-dui": "雷泽归妹",
  "zhen-li": "雷火丰",
  "li-gen": "火山旅",
  "xun-xun": "巽为风",
  "dui-dui": "兑为泽",
  "xun-kan": "风水涣",
  "kan-dui": "水泽节",
  "xun-dui": "风泽中孚",
  "zhen-gen": "雷山小过",
  "kan-li": "水火既济",
  "li-kan": "火水未济",
};

const typeProfiles = {
  key: { trigram: "qian", places: ["门口、玄关、锁具附近", "包内小夹层", "金属架或钥匙盘旁"] },
  phone: { trigram: "li", places: ["充电处、桌面边缘", "沙发缝或车座边", "最后使用屏幕的位置"] },
  document: { trigram: "li", places: ["文件袋、抽屉、票据夹", "柜台或前台", "包的扁平夹层"] },
  jewelry: { trigram: "dui", places: ["洗手台、化妆台", "衣物口袋或盒子", "地面反光处"] },
  clothes: { trigram: "kun", places: ["椅背、床边、洗衣篮", "衣柜下层", "布包或袋子里"] },
  book: { trigram: "xun", places: ["书桌、书架、纸堆中", "包内靠边处", "教室或办公室座位"] },
  medicine: { trigram: "kan", places: ["洗手台、床头、包内暗格", "抽屉低层", "随身小袋"] },
  other: { trigram: "gen", places: ["墙角、柜边、固定放置处", "最后停留点附近", "杂物堆下"] },
};

const directionProfiles = {
  unknown: { label: "不确定", trigram: "gen" },
  north: { label: "北", trigram: "kan" },
  northeast: { label: "东北", trigram: "gen" },
  east: { label: "东", trigram: "zhen" },
  southeast: { label: "东南", trigram: "xun" },
  south: { label: "南", trigram: "li" },
  southwest: { label: "西南", trigram: "kun" },
  west: { label: "西", trigram: "dui" },
  northwest: { label: "西北", trigram: "qian" },
};

const colorTrigrams = {
  black: "kan",
  white: "qian",
  red: "li",
  green: "xun",
  blue: "zhen",
  yellow: "kun",
  brown: "gen",
  mixed: "dui",
};

const sceneHints = {
  home: "先查家中玄关、床边、桌面、沙发缝、洗手台和常用包。",
  office: "先查工位、抽屉、会议室、教室座位、打印机或公共柜。",
  transit: "先查车座缝、包内、路线后半段，并联系司机或车站失物招领。",
  shop: "先问前台、收银台、餐桌附近、试衣间或服务人员。",
  outdoor: "先按行走路线倒查，重点看长椅、树边、台阶、草地边缘。",
  storage: "先翻包、柜、抽屉的夹层与底部，尤其是被布料压住的位置。",
  unknown: "先回忆最后一次明确使用，再按从近到远、从常用到非常用的顺序查。",
};

const form = document.querySelector("#finderForm");
const resultPanel = document.querySelector("#resultPanel");
const themeToggle = document.querySelector("#themeToggle");
const copyResult = document.querySelector("#copyResult");
const restartSearch = document.querySelector("#restartSearch");

const today = new Date();
document.querySelector("#lostDate").value = today.toISOString().slice(0, 10);
document.querySelector("#lostHour").value = String(toChineseHour(today.getHours()));
restoreTheme();

themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem("finder-theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = readFormData();
  const reading = buildReading(data);
  renderReading(reading);
  resultPanel.hidden = false;
  document.body.classList.add("result-mode");
  window.scrollTo({ top: 0, behavior: "auto" });
});

restartSearch.addEventListener("click", () => {
  document.body.classList.remove("result-mode");
  resultPanel.hidden = true;
  document.querySelector("#divination").scrollIntoView({ behavior: "smooth", block: "start" });
});

copyResult.addEventListener("click", async () => {
  const text = resultPanel.innerText.trim();
  try {
    await navigator.clipboard.writeText(text);
    copyResult.textContent = "已复制";
    window.setTimeout(() => {
      copyResult.textContent = "复制结果";
    }, 1400);
  } catch {
    alert("复制失败，可以手动选择结果文字复制。");
  }
});

function readFormData() {
  const values = Object.fromEntries(new FormData(form).entries());
  return {
    ...values,
    lostHour: Number(values.lostHour),
    date: new Date(`${values.lostDate}T00:00:00`),
  };
}

function buildReading(data) {
  const six = getXiaoLiuRen(data);
  const mei = getMeihua(data);
  const typeProfile = typeProfiles[data.itemType];
  const direction = chooseDirection(data, six, mei);
  const placeHints = buildPlaceHints(data, six, mei, typeProfile);
  const steps = buildSearchSteps(data, direction, placeHints, six, mei);

  return {
    itemName: data.itemName,
    direction,
    placeTitle: placeHints[0],
    placeDetail: placeHints.slice(1).join("；"),
    six,
    mei,
    steps,
  };
}

function getXiaoLiuRen(data) {
  const month = data.date.getMonth() + 1;
  const day = data.date.getDate();
  const hour = data.lostHour + 1;
  const index = (month + day + hour - 3) % sixGods.length;
  return {
    ...sixGods[index],
    index,
    formula: `月${month} + 日${day} + 时${hour}，落${sixGods[index].name}`,
  };
}

function getMeihua(data) {
  const month = data.date.getMonth() + 1;
  const day = data.date.getDate();
  const hour = data.lostHour + 1;
  const typeTrigram = typeProfiles[data.itemType].trigram;
  const directionTrigram = directionProfiles[data.lastDirection].trigram;
  const colorTrigram = colorTrigrams[data.itemColor];

  const upper = trigramOrder[(month + day + trigramOrder.indexOf(typeTrigram)) % 8];
  const lower = trigramOrder[(hour + trigramOrder.indexOf(directionTrigram) + trigramOrder.indexOf(colorTrigram)) % 8];
  const movingLine = ((month + day + hour + data.itemName.length) % 6) + 1;
  const hexagram = hexagramNames[`${upper}-${lower}`] || `${trigramMap[upper].name}${trigramMap[lower].name}之象`;

  return {
    upper,
    lower,
    movingLine,
    hexagram,
    upperInfo: trigramMap[upper],
    lowerInfo: trigramMap[lower],
    detail: `上卦${trigramMap[upper].name}，下卦${trigramMap[lower].name}，动爻${movingLine}。`,
  };
}

function chooseDirection(data, six, mei) {
  if (data.lastDirection !== "unknown") {
    return `${directionProfiles[data.lastDirection].label}方优先，兼看${six.direction}`;
  }
  return `${mei.lowerInfo.direction}方优先，兼看${six.direction}`;
}

function buildPlaceHints(data, six, mei, typeProfile) {
  const sizeHint = {
    tiny: "重点看缝隙、夹层、口袋、桌边和地面反光处",
    small: "重点看包内、抽屉、桌面边缘和最近坐过的位置",
    medium: "重点看椅背、柜边、车内、床边和常放物处",
    large: "重点看门口、墙边、公共寄放点和路线中明显停留处",
  }[data.itemSize];

  const movementHint = {
    still: "范围先不要放大，围绕最后确认点三米内细查",
    moved: "询问同行者、服务人员或同处空间的人",
    hidden: "多查被压、被盖、被夹、被挡住的位置",
    taken: "同步联系场所、查看监控或走挂失流程",
    unknown: "按原处、路线、他人接触点三层推进",
  }[data.movement];

  return [
    typeProfile.places[0],
    typeProfile.places[1],
    typeProfile.places[2],
    sizeHint,
    movementHint,
    `${mei.lowerInfo.image}；${sceneHints[data.lastScene]}`,
    six.hint,
  ];
}

function buildSearchSteps(data, direction, placeHints, six, mei) {
  const urgent = data.urgency === "high"
    ? "重要物品请立刻同步挂失、定位、报警或联系场所工作人员。"
    : "先用十分钟集中排查，避免一边焦急一边重复翻同一处。";

  return [
    `从${direction}开始，回到最后一次确定见到“${data.itemName}”的地点。`,
    placeHints[0],
    placeHints[3],
    sceneHints[data.lastScene],
    `按小六壬“${six.name}”提示：${six.hint}`,
    `按梅花卦“${mei.hexagram}”提示：留意${mei.lowerInfo.image}。`,
    urgent,
  ];
}

function renderReading(reading) {
  document.querySelector("#directionResult").textContent = reading.direction;
  document.querySelector("#directionDetail").textContent = `先找近处，再沿移动路线倒查。若方位不确定，以房间入口或最后站立位置作为中心。`;
  document.querySelector("#placeResult").textContent = reading.placeTitle;
  document.querySelector("#placeDetail").textContent = reading.placeDetail;
  document.querySelector("#sixResult").textContent = reading.six.name;
  document.querySelector("#sixDetail").textContent = `${reading.six.tone} ${reading.six.timing} ${reading.six.formula}。`;
  document.querySelector("#meiResult").textContent = reading.mei.hexagram;
  document.querySelector("#meiDetail").textContent = `${reading.mei.detail} ${reading.mei.upperInfo.name}主${reading.mei.upperInfo.image}，${reading.mei.lowerInfo.name}主${reading.mei.lowerInfo.image}。`;

  const list = document.querySelector("#searchSteps");
  list.innerHTML = "";
  reading.steps.forEach((step) => {
    const item = document.createElement("li");
    item.textContent = step;
    list.append(item);
  });
}

function toChineseHour(hour) {
  if (hour === 23) return 0;
  return Math.floor((hour + 1) / 2) % 12;
}

function restoreTheme() {
  if (localStorage.getItem("finder-theme") === "dark") {
    document.documentElement.classList.add("dark");
  }
}
