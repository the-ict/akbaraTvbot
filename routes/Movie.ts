import Movie from "../models/Movie"

const create = async () => {
    await Movie.create({
        title: "Yuklab olish - Bahubali 2: Muqaddima / Hotima O'zbek tilida 2017 Uzbekcha tarjima",
        video_url: "https://fayllar1.ru/2-1-h/Baxubali%202%20Xotima%20Hind%20kino%20720p%20O'zbek%20tilida%20(asilmedia.net).mp4",
        image: "http://asilmedia.org/uploads/mini/fullstory/8e/265x372xaf8fa9d272fc1ce73357173f358d25.jpg.pagespeed.ic.PizCCHbwdN.webp",
        trailer_url: "https://www.youtube.com/watch?v=sOEg_YZQsTI"
    }).then(() => { console.log("Yaratildi") })
        .catch(err => console.log("xatolik mavjud!", err))
}

create()