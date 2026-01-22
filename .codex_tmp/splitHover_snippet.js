splitHover=te=>{const ee=te.textContent;te.innerHTML=`
        <span class="split split-hover">
            <span class="line line-normal">${ee}</span>
            <span class="line line-hover">${ee}</span>
        </span>
    `}
