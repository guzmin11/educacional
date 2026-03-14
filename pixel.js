const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

const lastStyleTagIndex = content.lastIndexOf('</style>');
if (lastStyleTagIndex !== -1) {
  const insertIndex = content.indexOf('</head>', lastStyleTagIndex);
  if (insertIndex !== -1) {
     const p1 = content.slice(0, insertIndex);
     const p2 = content.slice(insertIndex);
     
     const insertion = `\n  <!-- Favicon -->\n  <link rel="icon" type="image/png" href="favicon.png" />\n\n  <!-- Meta Pixel Code -->\n  <script>\n    !function(f,b,e,v,n,t,s)\n    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?\n    n.callMethod.apply(n,arguments):n.queue.push(arguments)};\n    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\n    n.queue=[];t=b.createElement(e);t.async=!0;\n    t.src=v;s=b.getElementsByTagName(e)[0];\n    s.parentNode.insertBefore(t,s)}(window, document,'script',\n    'https://connect.facebook.net/en_US/fbevents.js');\n    fbq('init', '924382820251135');\n    fbq('track', 'PageView');\n  </script>\n  <noscript><img height="1" width="1" style="display:none"\n    src="https://www.facebook.com/tr?id=924382820251135&ev=PageView&noscript=1"\n  /></noscript>\n  <!-- End Meta Pixel Code -->\n`;
     
     content = p1 + insertion + p2;
     fs.writeFileSync('index.html', content, 'utf8');
     console.log("Success");
  } else {
     console.log("Could not find </head>");
  }
} else {
  console.log("Could not find </style>");
}
