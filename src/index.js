import data, { ROOT_NODE } from "./constants";

class FileTree {
  constructor(inputData) {
    this.inputData = inputData;

    this.handleFolderClick = this.handleFolderClick.bind(this);
  }

  init() {
    this.render();
  }

  handleFolderClick(event) {
    const target = event.target;
    const folderTarget = target.closest("div.folder-container");

    if (!folderTarget) {
      return;
    }

    const folder = folderTarget.parentNode;
    const folderID = folder.dataset.parentid || folder.dataset.id;
    const nestingID = folder.dataset.nesting || 0;

    this.toggleActiveFolder(folder);
    this.createChild(folder, Number(folderID), Number(nestingID));
  }

  getDeepChildData(data, deeps) {
    const isDataNotChildren = Array.isArray(data);

    const tempChildData = isDataNotChildren
      ? data.find(item => item.folder).children
      : data.children;
    const tempDeeps = deeps - 1;

    if (tempDeeps === 0) {
      return tempChildData;
    }

    return this.getDeepChildData(tempChildData, tempDeeps);
  }

  isValue(value) {
    return ![null, undefined].includes(value);
  }

  isFolderActive(folder) {
    return folder.classList.contains("active");
  }

  toggleActiveFolder(folder) {
    folder.classList.toggle("active");
    folder.firstChild.childNodes[0].innerHTML = this.isFolderActive(folder)
      ? "folder_open"
      : "folder";
  }

  createChild(folder, folderID, nestingID) {
    const normalizedNestingValue = nestingID + 1;

    const folderData = this.getDeepChildData(
      this.inputData[folderID],
      normalizedNestingValue
    );

    if (folderData === null || folderData === undefined) {
      return;
    }

    this.appendChild({
      folder,
      childData: folderData,
      folderID,
      nestingID: normalizedNestingValue
    });
  }

  appendChild({ folder, childData, folderID, nestingID }) {
    if (!this.isFolderActive(folder)) {
      folder.lastChild.remove();

      return;
    }

    let childContainer = document.createElement("ul");
    childContainer.classList.add("child");
    childContainer.classList.add("Container");
    folder.appendChild(childContainer);

    this.renderDataLevel({
      dataLevelForRender: childData,
      parentNode: childContainer,
      isList: true,
      folderID,
      nestingID
    });
  }

  renderDataLevel({
    dataLevelForRender,
    parentNode,
    isList,
    folderID,
    nestingID
  }) {
    let inputDataLevel = dataLevelForRender;

    inputDataLevel.forEach((elem, index) => {
      let { folder, title } = elem;

      const child = folder
        ? this.renderFolder({
            folderName: title,
            index: this.isValue(folderID) ? folderID : index,
            nesting: nestingID,
            isSubCat: this.isValue(folderID)
          })
        : this.renderFile(title, isList);

      parentNode.appendChild(child);
    });
  }

  renderFolder({ folderName, index, nesting, isSubCat }) {
    let folderElem = document.createElement("li");
    folderElem.dataset[isSubCat ? "parentid" : "id"] = index;

    if (nesting) {
      folderElem.dataset.nesting = nesting;
    }

    let folderContainer = document.createElement("div");

    let folderTitle = document.createElement("span");
    folderTitle.className = "name-label";
    folderTitle.innerText = folderName;

    let folderFragment = document.createDocumentFragment();
    let folderIcon = document.createElement("i");
    let iconName = document.createTextNode("folder");

    folderIcon.style.color = "orange";
    folderIcon.appendChild(iconName);
    folderIcon.classList.add("material-icons");

    folderContainer.appendChild(folderIcon);
    folderContainer.appendChild(folderTitle);
    folderElem.appendChild(folderContainer);

    folderContainer.appendChild(folderIcon);
    folderContainer.appendChild(folderTitle);
    folderElem.appendChild(folderContainer);

    folderContainer.classList.add("folder-container");
    folderElem.classList.add("folder", "folder-container");
    folderElem.classList.add("Node");
    folderElem.classList.add("ExpandOpen");

    folderFragment.appendChild(folderElem);

    return folderFragment;
  }

  renderFile(displayFileName, isList) {
    let fileElement = document.createElement(isList ? "li" : "div");
    let fileName = document.createElement("span");
    fileName.className = "name-label name-label__file";
    fileName.innerText = displayFileName;

    let fileIcon = document.createElement("i");
    let iconFileName = document.createTextNode("insert_drive_file");

    fileIcon.appendChild(iconFileName);
    fileIcon.classList.add("material-icons");
    fileElement.classList.add("file");
    fileElement.appendChild(fileIcon);
    fileElement.appendChild(fileName);

    return fileElement;
  }

  render() {
    let folderWrap = document.createElement("ul");
    folderWrap.className = "listWrap";
    folderWrap.addEventListener("click", this.handleFolderClick);

    this.renderDataLevel({
      dataLevelForRender: this.inputData,
      parentNode: folderWrap
    });

    ROOT_NODE.appendChild(folderWrap);
  }
}

const myFileTree = new FileTree(data);
myFileTree.init();
