import { UsageName } from "~/key-map/usage-names";
import { KeyboardUsageIdMap } from "~/key-map/position-mappings";
const body = document.body;
const width = window.innerWidth;
const height = window.innerHeight;
for (const key in KeyboardUsageIdMap) {
    const info = KeyboardUsageIdMap[key];
    if (!info)
        continue;
    const keyElement = document.createElement("div");
    keyElement.classList.add("key");
    keyElement.style.left = `${info.x * width}px`;
    keyElement.style.top = `${info.y * height}px`;
    const aroundElement = document.createElement("div");
    aroundElement.classList.add("key-around");
    keyElement.appendChild(aroundElement);
    const keyText = document.createElement("label");
    keyText.innerText = UsageName[key] || key;
    keyElement.appendChild(keyText);
    body.appendChild(keyElement);
}
