import { projects} from './app-data.js';
import { viewerHandler } from './modelViewer';

const header = document.querySelector('header');
const main = document.querySelector('main');

const clearHeader = () => {
  while (header.firstChild) {
    header.removeChild(header.firstChild);
  }
  header.className = '';
};

const clearMain = () => {
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  main.className = '';
};

const renderHome = () => {
  clearHeader();
  renderHomeHeader();

  clearMain();
  renderHomeMain();
};

const renderHomeHeader = () => {
  header.classList.add('home-header');

  const galleryTitle = document.createElement('h1');
  galleryTitle.textContent = 'Project Gallery';

  header.appendChild(galleryTitle);
};

const renderHomeMain = () => {
  main.classList.add('card-container');
  main.classList.add('animate__animated');
  main.classList.add('animate__zoomIn');

  for (let project of projects) {
    const card = document.createElement('article');
    card.classList.add('card');
    card.id = project.id;

    const icon = document.createElement('i');
    icon.classList.add('fa-solid');
    icon.classList.add('fa-building');

    const projectTitle = document.createElement('h2');
    projectTitle.classList.add('card-title');
    projectTitle.textContent = project.name;

    const projectDescription = document.createElement('p');
    projectDescription.classList.add('project-description');
    projectDescription.textContent = project.description;

    const viewButton = document.createElement('button');
    viewButton.classList.add('card-link');
    viewButton.textContent = 'view';
    viewButton.addEventListener('click', (e) => {
      const selectedProject = projects.find(
        (project) => project.id === e.target.parentElement.id
      );
      renderProject(selectedProject);
    });

    card.appendChild(icon);
    card.appendChild(projectTitle);
    card.appendChild(projectDescription);
    card.appendChild(viewButton);

    main.appendChild(card);
  }
};

const renderProject = (project) => {
  clearHeader();
  renderProjectHeader(project);

  clearMain();
  renderProjectMain(project);
};

const renderProjectHeader = (project) => {
  header.classList.add('project-header');

  const headerNav = document.createElement('nav');

  const projectNavTitle = document.createElement('h1');
  projectNavTitle.textContent = project.name;

  const projectNavButton = document.createElement('button');
  projectNavButton.textContent = 'home';
  projectNavButton.addEventListener('click', renderHome);

  headerNav.appendChild(projectNavTitle);
  headerNav.appendChild(projectNavButton);
  header.appendChild(headerNav);
};

const renderProjectMain = (project) => {
  main.classList.add('project-container');

  renderProjectInfo(project);
  renderProjectModel(project);
};

const renderProjectInfo = (project) => {
  const projectInfo = document.createElement('section');
  projectInfo.classList.add('project-info');
  projectInfo.classList.add('animate__animated');
  projectInfo.classList.add('animate__fadeInLeft');

  const infoList = document.createElement('ul');

  const filteredProject = { ...project };
  delete filteredProject.id;
  delete filteredProject.ifcPath;
  delete filteredProject.cameraPosition;

  for (let value in filteredProject) {
    const propertyItem = document.createElement('li');
    const propertyItemTitle = document.createElement('h4');
    const propertyItemContent = document.createElement('p');

    propertyItemTitle.textContent = value;
    propertyItemContent.textContent = project[value];

    propertyItem.appendChild(propertyItemTitle);
    propertyItem.appendChild(propertyItemContent);

    infoList.appendChild(propertyItem);
  }

  projectInfo.appendChild(infoList);

  main.appendChild(projectInfo);
};

const renderProjectModel = (project) => {
  const modelContainer = document.createElement('section');
  modelContainer.classList.add('model-container');
  modelContainer.classList.add('animate__animated');
  modelContainer.classList.add('animate__fadeInRight');

  const modelViewer = document.createElement('canvas');
  modelViewer.setAttribute('id', 'model-viewer');

  // const modelNav = document.createElement('nav');
  // modelNav.classList.add('project-options');

  // for (let control of controls) {
  //   const controlButton = document.createElement('button');
  //   const controlIcon = document.createElement('i');

  //   controlIcon.classList.add('fa-solid');
  //   controlIcon.classList.add(control.icon);

  //   controlButton.appendChild(controlIcon);
  //   modelNav.appendChild(controlButton);
  // }

  modelContainer.appendChild(modelViewer);
  // modelContainer.appendChild(modelNav);

  main.appendChild(modelContainer);

  viewerHandler(project);
};

renderHome();
