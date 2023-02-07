# Dockery

<p>Dockery is a Docker Destop extension that simplifies monitoring and managing container memory limits. With an intuitive UI, users can easily understand container memory usage AND set/udpdate memory limits - both hard limit(--memory) and soft limit(--memory-reservation)<p>
<br>
<h2>Features</h2>

<p>
  Dockery displays real-time, important memory metrics such as total memory used by all containers, memory usage per container, and memory usage ratio by container (fig 1). These metrics are displayed in easy to digest graphs. However, the real power of Dockery lies within its table, where detailed memory metrics on all running containers are shown. Clicking on a row reveals an intuitive GUI where users can do 2 things: 
  <ol>
    <li>Visually compare memory usage to the soft & hard limits (fig 2)</li>
    <li>Easily re-allocate memory through assignment of memory limits (fig 3)</li>
  </ol>
</p>

<br>

<h3 align="center">
  <em>Figure 1: Intuitive UI to understand memory metrics on all running containers</em>
</h3>
<p align='center'>
  <img src = './readMeMedia/dockery_overview_screenshot.png'  width='100%'/>
</p>

<br>

<h3 align="center">
  <em>Figure 2: Detailed memory metrics on all containers found within the table</em>
</h3>
<p align='center'>
  <img src = './readMeMedia/dockery_table_details_screenshot.png'  width='100%'/>
</p>

<br>

<h3 align="center">
  <em>Figure 3: Intuitive UI for updating memory limits</em>
</h3>
<p align='center'>
  <img src = './readMeMedia/Updating_memory_limits.gif'  width='100%'/>
</p>

<br>

<h2>Getting Started</h2>
<p>Pre-requisite: Download Docker Desktop 4.8.0 or later</p>
<br>

1. Clone this repository to your local machine
2. Navigate to dockery folder in your terminal/PowerShell
3. Build your docker image: 
```
docker build -t dockery .
```
4. Install Dockery onto Docker Desktop: 
```
docker extension install dockery
```
<p>You may be asked: 'Are you sure you want to continue? [y/N]' --> enter 'y' to continue</p>

5. Dockery is now installed and will be running inside of Docker Desktop

<br>
<h2>Extension Marketplace:</h2>
<p>We are in the process of applying to have Dockery added to the Docker Desktop Extension Marketplace, but it is not yet avaliable there. </p>
<br>
<h2>Windows containers</h2>
<p>Under the hood, Dockery uses the <code>docker update</code> command to update container memory limits, which is currently NOT supported for Windows containers. If you are running Windows containers, you can still use Dockery to visually monitor your container memory metrics and limits, but to update you will still need to use the CLI and update limits another way.</p>

<br>
<h2>Contributing</h2>
<p>Dockery is an open source product, so we welcome any/all feedbak. Please reach out or submit a PR if you'd like to help imporve Dockery! </p>
<h2>Contributors</h2>

<ul>
  <li>Mike Battey  | <a href='https://www.linkedin.com/in/michael-battey-0591a1133/' target ='blank' >Linkedin</a> | <a href='https://github.com/Mrbattey' target = 'blank'>Github</a></li>
  <li>Benjamin Ly  | <a href='https://www.linkedin.com/in/benjaminly88/' target = 'blank'>Linkedin</a> | <a href = 'https://github.com/benjaminly88' target = 'blank'>Github</a></li>
  <li>Chase Mann | <a href = 'https://www.linkedin.com/in/chase-mann/' target = 'blank'>Linkedin</a> | <a href= 'https://github.com/xChesa' target = 'blank'>Github</a></li>
  <li>Eliot Orando | <a href = 'https://www.linkedin.com/in/eliot-orando/' target = 'blank'>Linkedin</a> | <a href = 'https://github.com/EliotOrando' target = 'blank'>Github</a></li>
</ul>
<br>
<h2>Proudly partnered with <a href ='https://github.com/oslabs-beta' target='blank'>OS Labs</a></h2>

