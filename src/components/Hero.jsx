import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import { SplitText } from 'gsap/all'
import gsap from 'gsap'
import { useMediaQuery } from 'react-responsive'

const Hero = () => {

    const videoRef = useRef();
    const isMobile = useMediaQuery({ maxWidth: 767})

    useGSAP(() => {

        const heroSplit = new SplitText('.title', {type: 'chars, words'});
        const paragraphSplit = new SplitText('.subtitle', {type: 'lines'});

        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06 //ogni carattere apparirà dopo 0.06 secondi, effetto onda
        })

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
            delay: 1 //questa animazione inizia un secondo dopo che l'animazione dell'headline è finita
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        })
        .to('.right-leaf', { y: 200 }, 0)
        .to('.left-leaf', { y: -200 }, 0)

        const startValue = isMobile ? 'top 50%' : 'center 60%'; //la prima proprietà (top) si riferisce SEMPRE all'elemento che stiamo animando, la seconda proprietà (50%) si riferisce SEMPRE allo schermo. Quindi: quando il top del video raggiunge la metà dello schermo
        const endValue = isMobile ? '120% top' : 'bottom top';

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'video',
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true, //pinna il video sullo schermo, se scrollo il video non si muove
            }
        })

        videoRef.current.onloadedmetadata = () => {
            tl.to(videoRef.current, {
                currentTime: videoRef.current.duration
            })
        }

    }, [])

    return (
        <>
            <section id='hero' className='noisy'>
                <h1 className='title'>MOJITO</h1>
                <img src="/images/hero-left-leaf.png" alt="left-leaf" className='left-leaf' />
                <img src="/images/hero-right-leaf.png" alt="right-leaf" className='right-leaf' />
                <div className='body'>
                    <div className='content'>
                        <div className='space-y-5 hidden md:block'>
                            <p>Cool. Crisp. Classic.</p>
                            <p className='subtitle'>Sip the spirit <br /> of summer</p>
                        </div>
                        <div className='view-cocktails'>
                            <p className='subtitle'>
                            Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes — designed to delight your senses.
                            </p>
                            <a href="#cockatils">View Cocktails</a>
                        </div>
                    </div>
                </div>
            </section>

            <div className='videao absolute inset-0'> 
                {/* la classe absolute serve quando non vogliamo che il div interagisca con gli altri elementi sullo schermo*/}
                <video 
                    ref={videoRef}
                    src='/videos/output.mp4'
                    muted
                    playsInline //serve a nascondere gli elementi tipo play/pausa, regolazione volume...
                    preload='auto' //carica automaticamente
                />
            </div>
        </>
    )
}

export default Hero
