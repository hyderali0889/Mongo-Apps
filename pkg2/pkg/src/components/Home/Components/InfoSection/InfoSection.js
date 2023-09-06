"use client"
import React from 'react'
import {InfoSec, InfoRow, InfoColumn, TextWrapper, TopLine, Heading, Subtitle, ImgWrapper, Img} from './InfoSection.elements'
import { Container } from '../../globalStyles'

const InfoSection = ({
    primary,
    lightBg,
    topLine,
    lightTopLine,
    lightText,
    lightTextDesc,
    headline,
    description,
    buttonLabel,
    img,
    alt,
    imgStart,
    start
}) => {
    return (
        <>
            <InfoSec >
                <Container>
                    <InfoRow >
                        <InfoColumn>
                            <TextWrapper>
                            <TopLine >{topLine}</TopLine>
                            <Heading >{headline}</Heading>
                            <Subtitle >{description}</Subtitle>


                            </TextWrapper>
                        </InfoColumn>
                        <InfoColumn>
                        <ImgWrapper>
                            <Img src={img} alt={alt} />
                        </ImgWrapper>
                        </InfoColumn>
                    </InfoRow>
                </Container>
            </InfoSec>
        </>
    )
}

export default InfoSection;