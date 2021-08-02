        var grid = [];

            if(localStorage.score === undefined)
            localStorage.setItem("score",0);
            
        var vacant = 0,score = 0;
        const section = document.getElementById('section')
        // DOM manipulation

        for(let i=0;i<16;++i){
            let element = document.createElement('span');
            // element.innerHTML = grid[Math.floor(i/4)][Math.floor(i%4)]
            element.className = 'box';
            section.appendChild(element)
        }

        const child = section.children;

        document.onkeydown = checkKey;
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
            }
        
        function startingPoint(){
            grid = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        
        score = 0;
        random_generate(getRandomInt(16))
        random_generate(getRandomInt(16))
    }
        
        function display(){
            vacant=0;
            document.getElementById('score').innerHTML = score
            for(let i=0;i<16;i++){
                child[i].innerHTML = grid[Math.floor(i/4)][Math.floor(i%4)] ? grid[Math.floor(i/4)][Math.floor(i%4)] : ''
                if(! grid[Math.floor(i/4)][Math.floor(i%4)])
                vacant++;
            }
            // vacant = 0
            if(!vacant){
                    setTimeout(()=> {
                        document.getElementById('modal').style.display = "block"
                        document.getElementById('mscore').innerHTML = score
                        // alert("try again...")
                    // location.reload()
                    // startingPoint()
                    },1000)
                }
                if( localStorage.score < score)
                localStorage.score = score
                // else
                // localStorage.setItem("score",score)
                document.getElementById('pscore').innerHTML = localStorage.score
                // else 
        }
        
        function resume(){
            document.getElementById('modal').style.display = "none"
            startingPoint()
        }
        function random_generate(x){

            while(grid[Math.floor(x/4)][Math.floor(x%4)])
                x = getRandomInt(16)
            grid[Math.floor(x/4)][Math.floor(x%4)] = (getRandomInt(2) ? 4 : 2);
            display();
        }

        function upArrow(){
            // UP shift of boxes
            let x=0,y=0;
            for(let j=0;j<4;++j){
                x=0;
                for(let i=0;i<4;++i){
                    if(grid[i][j]){
                       grid[x++][y] = grid[i][j]
                    }
                    if(i >(x-1)) grid[i][j] = 0
                }
                ++y;
            }
            // Mixing...
            y=0;
            for(let j=0;j<4;++j){
                x=0;
                let flag = false
                for(let i=1;i<4;++i){
                    if(!grid[i][j]) break;
                    else if(grid[i][j] === grid[i-1][j]){
                       score += grid[x++][y] = grid[i][j] + grid[i-1][j]
                        grid[i][j] = 0
                        flag=true
                    // i++;
                }
                    else {//if(grid[i][j]){
                        // x += 1;
                        if(flag){
                        grid[x++][y] = grid[i][j];
                        grid[i][j]=0
                    }
                    else {
                        x += 1;
                    }
                    }
                }
                y++;
            }

            random_generate(getRandomInt(16));
        }

        function downArrow(){
            let x=0,y=0;
            for(let j=0;j<4;++j){
                x=3;
                for(let i=3;i>=0;--i){
                    if(grid[i][j]){
                       grid[x--][y] = grid[i][j]
                    }
                    if(i <(x+1)) grid[i][j] = 0
                }
                ++y;
            }
            // Mixing...
            y=0;
            for(let j=0;j<4;++j){
                x=3;
                let flag = false
                for(let i=2;i>=0;--i){
                    if(!grid[i][j]) break;
                    else if(grid[i][j] === grid[i+1][j]){
                       score +=  grid[x--][y] = grid[i][j] + grid[i+1][j]
                        grid[i][j] = 0
                        flag = true
                    // i++;
                }
                    else {//if(grid[i][j]){
                        // x -= 1;
                        if(flag){
                        grid[x--][y] = grid[i][j];
                        grid[i][j] = 0;
                        }
                        else x -= 1;
                    }
                }
                y++;
            }
            random_generate(getRandomInt(16));
        }

        function leftArrow(){
            let x=0,y=0;
            for(let i=0;i<4;++i){
                y=0;
                for(let j=0;j<4;++j){
                    if(grid[i][j]){
                       grid[x][y++] = grid[i][j];
                    }
                    if(j > (y-1)){
                        grid[i][j]=0;
                    }
                }
                ++x;
            }
            // Adding...
            x=0;
            for(let i=0;i<4;++i){
                y=0;
                let flag =false
                for(let j=1;j<4;++j){
                    if(!grid[i][j]) break;
                    else if(grid[i][j] === grid[i][j-1]){
                      score +=  grid[x][y++] = grid[i][j] + grid[i][j-1];
                        grid[i][j] = 0;
                        flag = true
                    }
                    else {//if(grid[i][j]) {
                    // y++;
                    if(flag){
                    grid[x][y++] = grid[i][j]
                    grid[i][j] = 0;
                    }
                    else y += 1;
                }
                }
                x++;
            }
            random_generate(getRandomInt(16));
        }

        function rightArrow(){
            let x=0,y=0;
            for(let i=0;i<4;++i){
                y=3;
                for(let j=3;j>=0;--j){
                    if(grid[i][j]){
                       grid[x][y--] = grid[i][j];
                    }
                    if(j < (y+1)){
                        grid[i][j]=0;
                    }
                }
                ++x;
            }
            // Addition
            x=0
            for(let i=0;i<4;++i){
                y=3;
                let flag = false
                for(let j=2;j>=0;--j){
                    if(!grid[i][j]) break;
                    else if(grid[i][j] === grid[i][j+1]){
                      score +=  grid[x][y--] = grid[i][j] + grid[i][j+1]
                        grid[i][j] = 0
                        flag = true
                    }
                    else {//if(grid[i][j]) {
                        // y--;
                        if(flag){
                        grid[x][y--] = grid[i][j]
                        grid[i][j] =0
                        }
                        else y -= 1;
                    }
                }
                x++;
            }
            random_generate(getRandomInt(16));
        }
        
            function checkKey(e) {
                // e = e || window.event;
                if (e.keyCode == '38') {
                    upArrow()
                }
                else if (e.keyCode == '40') {
                    downArrow()
                }
                else if (e.keyCode == '37') {
                    leftArrow()
                }
                else if (e.keyCode == '39') {
                    rightArrow()
                }
            }
            