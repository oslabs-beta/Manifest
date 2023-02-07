# Dockery

<p>Dockery is a Docker Destop extension that simplifies monitoring and updating container memory limits. With an intuitive UI, users can both easily understand container memory usage and set or udpdate memory limits - both hard limit(--memory) and soft limit(--memory-reservation)<p>
<br>
<h2>Features</h2>
<hr>
<p>
  Dockery displays real-time, important memory metrics such as total memory used by all containers, memory usage by container, and memory usage ratio by container (fig 1). These metrics are displayed in easy to digest graphs. However, the real power of Dockery lies within its table, where detailed memory metrics on all running containers are shown. Clicking on a row reveals an intuitive GUI where users can do 2 things: 
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
  <img src = './readMeMedia/dockery_overview_screenshot.png'  width='50%'/>
</p>

<br>

<h3 align="center">
  <em>Figure 2: Detailed memory metrics on all containers found within the table</em>
</h3>
<p align='center'>
  <img src = './readMeMedia/dockery_table_details_screenshot.png'  width='50%'/>
</p>

<br>

<h3 align="center">
  <em>Figure 3: Intuitive UI for updating memory limits</em>
</h3>
<p align='center'>
  <img src = './readMeMedia/Updating_memory_limits.gif'  width='50%'/>
</p>

<br>

<h2>Getting Started</h2>
<hr/>
<p>Getting started with Dockery can be done in 3 simple steps</p>
<ol>
  <li>Fork and clone this repository to your local machine</li>
  <li>Build your docker image: <br><code>docker build -t dockery .</code></li>
  <li>Install Dockery onto Docker Desktop: <br><code>docker extension install dockery</code><br>(if asked 'Are you sure you want to continue? [y/N]', enter 'y')</li>
</ol>
<p>Next time you open Docker Desktop you should see Dockery installed and you can begin using it to manage your containers.</p>
<br>
<h3>Extension Marketplace:</h3>
<p>We are in the process of applying to have Dockery added to the Docker Desktop Extension Marketplace, but it is not yet avaliable there. </p>
<br>
<h3>Windows containers</h3>
<p>Under the hood, Dockery uses the <code>docker update</code> command to update container memory limits, which is currently NOT supported for Windows containers. If you are running Windows containers, you can still use Dockery to visualy monitor your container memory metrics and limits, but to update you will still need to use the CLI and update limits another way.</p>

<br>
<h2>Contributors</h2>
<hr>
<ul>
  <li>Mike Battey  | <a href='https://www.linkedin.com/in/michael-battey-0591a1133/' target ='blank' >Linkedin</a> | <a href='https://github.com/Mrbattey' target = 'blank'>Github</a></li>
  <li>Benjamin Ly  | <a href='https://www.linkedin.com/in/benjaminly88/' target = 'blank'>Linkedin</a> | <a href = 'https://github.com/benjaminly88' target = 'blank'>Github</a></li>
  <li>Chase Mann | <a href = 'https://www.linkedin.com/in/chase-mann/' target = 'blank'>Linkedin</a> | <a href= 'https://github.com/xChesa' target = 'blank'>Github</a></li>
  <li>Eliot Orando | <a href = 'https://www.linkedin.com/in/eliot-orando/' target = 'blank'>Linkedin</a> | <a href = 'https://github.com/EliotOrando' target = 'blank'>Github</a></li>
</ul>
<br>
<h2>Proudly partnered with OS Labs</h2>
<hr>
