//datas

         let song_obj=[{
    title:"Arabic Kuthu",
    artist:"Anirudh Ravichander Ft. Jonita Gandhi",
    img:"./Images/Beast-Tamil-2022-20220504184736-500x500.jpg",
    audio:"./Audios/m1.mp3"
    
},
{
    title:"Badass",
    artist:"Song by Anirudh Ravichander, Hanuman, and Raqueeb Alam",
    img:"./Images/Badass-From-Leo-Tamil-2023-20230928162246-500x500.jpg",
    audio:"./Audios/m4.mp3"
},
{
    title:"Jalabulajangu",
    artist:"Anirudh Ravichandran",
    img:"./Images/Don-Tamil-2022-20220512162818-500x500.jpg",
    audio:"./Audios/m2.mp3"
},
{
    title:"So Baby",
    artist:"Song by Ananthakrrishnan and Anirudh Ravichander",
    img:"./Images/images.jpg",
    audio:"./Audios/m3.mp3"
},
{
    title:"Katchi Sera",
    artist:"Song by Sai Abhyankkar ",
    img:"./Images/Katchi-Sera-from-Think-Indie-Tamil-2024-20240122043105-500x500.jpg",
    audio:"./Audios/m6.mp3"
},
{
    title:"Vengamavan",
    artist:"Song by Chinnaponnu and Hiphop Tamizha",
    img:"./Images/Vengamavan.jpg.jpg",
    audio:".Audios/m5.mp3"
}
];

// variables
     let progress =document.getElementById("progress");
        let song =document.getElementById("song");
        let ctrlIcon =document.getElementById("ctrlIcon");
        
        let index_no=0;
       
        let playing_song=true;
    
        let audio_track=document.querySelector("audio");
        let song_image=document.getElementById("song_img");
        let song_title=document.getElementById("song_name");
        let song_artist=document.getElementById("artist");
        
        let currentTimeDisplay = document.querySelector("#timer-in");


// like button
function red(){
    let heart=document.querySelector(".fa-heart")
    if(heart.style.color=="grey"){
    heart.style.color="red"}
    
    else{
        heart.style.color="grey"
    }

}
    
    // for array obj 
        function load_track(index_no){
        

        audio_track.src=song_obj[index_no].audio;
        song_title.innerHTML=song_obj[index_no].title;
        song_image.src=song_obj[index_no].img;
        // console.log(song_image.img=song_obj[index_no].image)
        song_artist.innerHTML=song_obj[index_no].artist;
        

       

    }
    load_track(index_no)
    // pause ,play
    function pla_ys(){
        if(playing_song==true){
            pausesong()   
        }
        else{
            play_song()
        }
        
    }
//for playing
    function play_song(){
    console.log(audio_track);
    audio_track.play();
    playing_song=true;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
    
    

}
// for pause
function pausesong(){
    audio_track.pause();
    playing_song=false;
    ctrlIcon.classList.add("fa-play");
   ctrlIcon.classList.remove("fa-pause");
   
    


}
// for next
function next(){
    if(index_no<song_obj.length){
        let heart=document.querySelector(".fa-heart")
        index_no +=1;
        load_track(index_no);
        play_song();
        heart.style.color="grey"

     }
     else{
       index_no=0;
       load_track(index_0);
       play_song();
    }
}
//for previous
function previous(){
    if(index_no<song_obj.length-1 ){
        let heart=document.querySelector(".fa-heart")
        index_no-=1;
        load_track(index_no);
        play_song();
        heart.style.color="grey"

    }
    else{
    
        load_track(index_0);
        play_song();
    }
}

        // for shuffle
        shuffle.addEventListener("click", ()=> {
    var randIndex = Math.floor(Math.random()*song_obj.length)+1;
    load_track(randIndex);
    play_song();
})

//progress
        audio_track.onloadedmetadata = function(){
            progress.max = audio_track.duration;
            progress.value = audio_track.currentTime; 
         }

       
        if(audio_track.play()){
            setInterval(()=>{
                progress.value = audio_track.currentTime;
            },500)
        } 
        progress.onchange = function(){
            audio_track.play();
            audio_track.currentTime = progress.value;
        }

        


// to download
function downloadAudio() {
            let audioUrl =`${song_obj[index_no].audio}`;
            let link = document.createElement('a');
            link.href = audioUrl;
            link.download = `${song_obj[index_no].title}.mp3`; 
            link.click();
        }
// song timing

    audio_track.addEventListener("timeupdate", ()=>{
    let currentTime = Math.floor(audio_track.currentTime);
    console.log(currentTime)
    let minutes = Math.floor(currentTime /60);
    let seconds =currentTime % 60;
    if (minutes < 10){
        minutes = "0"+minutes;
    }
    if (seconds < 10){
        seconds = "0"+seconds
    }
    let formatedTime =` ${minutes} : ${seconds}`;
    currentTimeDisplay.textContent = `${formatedTime}`;
    
})


    