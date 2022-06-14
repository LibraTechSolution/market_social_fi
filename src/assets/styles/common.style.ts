import styled, { css } from 'styled-components';
import { pixelToRem } from 'utils/functions';
import { motion } from 'framer-motion';
import BackgroundBannerCard from 'assets/images/background-banner.svg';

interface FlexContainerProps {
  flex?: 'row' | 'column';
  width?: string;
  height?: string;
  border?: string;
  margin?: string;
  padding?: string;
  columnGap?: string;
  rowGap?: string;
  color?: string;
  background?: string;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
}

interface Text {
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  color?: string;
  margin?: string;
  padding?: string;
  orderHeading?: number;
}

interface ImageGalleryProps {
  width?: number;
  height?: number;
  src: string;
  borderRadius?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export const Container = styled.div<FlexContainerProps>`
  display: flex;
  flex-direction: ${(props) => props.flex};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  column-gap: ${(props) => props.columnGap};
  row-gap: ${(props) => props.rowGap};
`;

export const LogoName = styled.span`
  font: var(--font-heading-7);
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  top: 0;
  position: fixed;
  background: var(--gdf-white);
  width: 100%;
  height: ${pixelToRem(96)};
  z-index: 999;
  box-shadow: ${pixelToRem(0, 0, 28)} rgba(123, 71, 225, 0.2);
`;

export const FooterBlock = styled.footer`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: ${pixelToRem(237)};
  position: relative;
  background: var(--gdf-blue-whisper);
  z-index: 10;
`;

export const Logo = styled.image<FlexContainerProps>`
  width: ${pixelToRem(201)};
  height: ${pixelToRem(41)};
  background-image: url('/images/logo-space-y.svg');
`;

export const Main = styled.main`
  display: flex;
  max-width: 100vw;
  justify-content: center;
  min-height: calc(100vh - ${pixelToRem(96)} - ${pixelToRem(237)});
  margin-top: ${pixelToRem(96)};
  position: relative;
  overflow: hidden;

  svg {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export const Heading1 = styled.h1<Text>`
  ${({ orderHeading }) =>
    orderHeading &&
    orderHeading > 0 &&
    css`
      font: var(--font-heading-${orderHeading});
    `};
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

export const Heading2 = styled.h2<Text>`
  ${({ orderHeading }) =>
    orderHeading &&
    orderHeading > 0 &&
    css`
      font: var(--font-heading-${orderHeading});
    `};
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

export const Heading3 = styled.h3<Text>`
  ${({ orderHeading }) =>
    orderHeading &&
    orderHeading > 0 &&
    css`
      font: var(--font-heading-${orderHeading});
    `};
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

export const Paragraph = styled.p<Text>`
  ${({ orderHeading }) =>
    orderHeading &&
    orderHeading > 0 &&
    css`
      font: var(--font-heading-${orderHeading});
    `};
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

export const FirstTitle = styled.div`
  color: var(--sun);
  font: var(--text-4);
  text-transform: uppercase;
  letter-spacing: ${pixelToRem(5)};
`;

export const SecondTitle = styled.p`
  color: var(--text);
  font: var(--font-display);

  span {
    color: var(--mars);
  }
`;

export const Subtitle = styled.p`
  color: var(--gray-05);
  font: var(--font-heading-3);
  max-width: ${pixelToRem(728)};
`;

export const AstrounautIllustration = styled.image`
  width: ${pixelToRem(472)};
  height: ${pixelToRem(600)};
  position: absolute;
  background-image: url('/images/home-mars-right.svg');
  background-repeat: no-repeat;
  right: 0;
  top: ${pixelToRem(10)};

  @media (max-width: ${pixelToRem(1200)}) {
    position: relative;
    order: 4;
    width: ${pixelToRem(472)};
    height: ${pixelToRem(600)};
    left: 0;
  }
`;

export const DivBlock = styled.div<FlexContainerProps>`
  display: flex;
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  column-gap: ${(props) => props.columnGap};
  row-gap: ${(props) => props.rowGap};
  flex-direction: ${(props) => props.flex};
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.background};
`;

export const SectionBlock = styled.section<FlexContainerProps>`
  display: flex;
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  column-gap: ${(props) => props.columnGap};
  row-gap: ${(props) => props.rowGap};
  flex-direction: ${(props) => props.flex};
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.background};
`;

export const DivButton = styled.div<FlexContainerProps>`
  color: ${(props) => props.color};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  line-height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background: ${(props) => props.background};
  font: var(--font-heading-2);
  border: ${(props) => props.border};
  border-radius: 8px;
  text-align: center;
`;

export const DivIcons = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  max-width: ${pixelToRem(1440)};
  align-items: center;
  width: 100%;
`;

export const SectionAbout = styled.div<FlexContainerProps>`
  display: flex;
  justify-content: center;
  background: url('/images/stars.jpg') no-repeat;
  background-size: cover;
  flex-direction: ${(props) => props.flex};
`;

export const ImageMars = styled(motion.image)`
  width: ${pixelToRem(621)};
  height: ${pixelToRem(621)};
  background-image: url('/images/mars.svg');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
`;

export const DivAboutMars = styled(motion.div)<FlexContainerProps>`
  max-width: ${pixelToRem(603)};
`;

export const SecondSubTitle = styled.p`
  font: var(--font-heading-1);
  color: var(--text);
  padding-top: ${pixelToRem(14)};
`;

export const TextMars = styled.p`
  font: var(--text-1);
  color: var(--gray-05);
  padding-top: ${pixelToRem(26)};
`;

export const GalleryContent = styled.div<FlexContainerProps>`
  display: flex;
  flex-direction: ${(props) => props.flex};
  margin: ${pixelToRem(150, 100, 157, 300)};
`;

export const DivLogo = styled(motion.div)<FlexContainerProps>`
  max-width: ${pixelToRem(350)};
  margin-right: ${pixelToRem(30)};
`;

export const DivLogoSpaceY = styled.div`
  display: flex;
  padding-bottom: ${pixelToRem(13)};
`;

export const ImageGallery = styled.img<ImageGalleryProps>`
  width: ${({ width }) => width && pixelToRem(width)};
  height: ${({ height }) => height && pixelToRem(height)};
  border-radius: ${({ borderRadius }) => borderRadius && pixelToRem(borderRadius)};
  object-fit: ${({ objectFit }) => objectFit};
`;

export const ContainerAbout = styled.div<FlexContainerProps>`
  display: flex;
  flex-direction: ${(props) => props.flex};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  width: ${(props) => props.width};
  margin-top: ${pixelToRem(180)};
  gap: ${pixelToRem(200)};
`;

export const TextNote = styled.span`
  font: var(--font-heading-1);
`;

export const TextSubscribe = styled(motion.p)`
  font: var(--text-3);
  color: var(--mars-light);
  cursor: pointer;
  padding-top: ${pixelToRem(20)};
`;

export const ContainerForm = styled.div`
  display: flex;
  width: 100%;
  background: url('/images/background-stars-form.jpg') no-repeat;
  background-size: cover;
  justify-content: space-around;
`;

export const SectionForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: url('/images/background-stars-form.jpg') no-repeat;
  background-size: cover;
  justify-content: space-around;
`;

export const DivForm = styled(motion.div)`
  background: var(--background-form);
  border-radius: ${pixelToRem(20)};
  align-items: center;
  justify-content: center;
  padding: ${pixelToRem(39, 51, 61, 52)};
  margin-left: ${pixelToRem(120)};
  max-height: ${pixelToRem(792)};
`;
export const IconForm = styled.div`
  background: url('/images/icon-ticket.svg') no-repeat;
  width: ${pixelToRem(56)};
  height: ${pixelToRem(56)};
`;
export const TitleForm = styled.div`
  font: var(--font-heading-2);
  color: var(--text);
  max-width: ${pixelToRem(264)};
  padding-top: ${pixelToRem(16)};
`;
export const SubtitleForm = styled.div`
  font: var(--heading-3);
  color: var(--gray-05);
  max-width: ${pixelToRem(308)};
`;

export const DivRocketImage = styled(motion.div)`
  display: flex;
`;

export const RocketImage = styled(motion.image)`
  width: ${pixelToRem(980)};
  height: ${pixelToRem(980)};
`;

export const DivInputCheckbox = styled.div`
  display: flex;
  padding: ${pixelToRem(24, 0, 32, 0)};
`;

export const InputCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: ${pixelToRem(24)};
  height: ${pixelToRem(24)};
  border: 1px solid var(--gray-05);
  margin-right: ${pixelToRem(16)};
  appearance: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  content: '';

  &:checked {
    background-color: var(--mars);
  }
`;

export const TextCheckbox = styled.p`
  font: var(--text-1);
  color: var(--gray-05);
`;

export const SectionFooter = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DivImageSmoke = styled(motion.div)`
  width: 100%;

  & img {
    width: 100%;
  }
`;

export const DivFooterBottom = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const DivSocial = styled.div`
  display: flex;
  gap: ${pixelToRem(20)};

  & img {
    width: ${pixelToRem(25)};
    height: ${pixelToRem(25)};
  }
`;

export const DivFooterMenu = styled.div`
  gap: ${pixelToRem(53)};

  & ul {
    display: flex;
    list-style: none;
    gap: ${pixelToRem(53)};
  }

  & a {
    color: var(--text);
    font: var(--text-3);
    text-decoration: none;
  }
`;
