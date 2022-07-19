import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Image = styled.img`
  margin: 15px;
  width: ${props => props.iconSize};
  alt: 'Image';
  margin-bottom: ${props => props.marginBottom};
`;
Image.propTypes = {
  iconSize: PropTypes.string,
  marginBottom: PropTypes.string,
};
Image.defaultProps = {
  iconSize: '100px',
  marginBottom: 'auto',
};

const Div = styled.div`
  width: ${props => props.Width};
  display: ${props => props.Display};
`;
Div.propTypes = {
  Width: PropTypes.string,
  Display: PropTypes.string,
};
Div.defaultProps = {
  align: '100%',
  Display: 'flex',
};

const Span = styled.span`
  font-size: 1.4rem;
  color: 'grey';
  width: 50px;
`;
const Line = styled.hr`
  border-top: 1px solid #a8a8a8;
  border-bottom: transparent;
`;
const FlexDiv = styled.div`
  font-size: '1px';
  display: flex;
  width: 100%;
  align-items: center;
  align-content: ${props => props.align};
  padding: ${props => props.Padding};
  padding-left: ${props => props.PaddingHorizontal};
  padding-right: ${props => props.PaddingHorizontal};
  padding-top: ${props => props.PaddingVertical};
  padding-bottom: ${props => props.PaddingVertical};
`;
FlexDiv.propTypes = {
  align: PropTypes.string,
  PaddingHorizontal: PropTypes.string,
  PaddingVertical: PropTypes.string,
};
FlexDiv.defaultProps = {
  align: 'space-between',
  PaddingHorizontal: 'auto',
  PaddingVertical: 'auto',
};

export default function Footer() {
  return (
    <footer>
      <Line />
      <FlexDiv
        PaddingHorizontal="6rem"
        PaddingVertical="3rem"
        align="space-between">
        <Div width="25%" Display="inline-block">
          <a href="#/">
            <Image
              src="https://iudx-catalogue-assets.s3.ap-south-1.amazonaws.com/iudx.png"
              iconSize="9.4rem"
            />
          </a>
          <div>
            <a href="https://goo.gl/maps/MyKzgG2gzK1JsENz7">
              <Image src="location.png" iconSize=" 1.2rem" marginBottom="0px" />
              <Span>
                Indian Institute of Science, Entrepreneurship Centre, Ground
                Floor, Bengaluru, Karnataka 560012
              </Span>
            </a>
          </div>
        </Div>
        <Div width="100%">
          <FlexDiv align="start">
            <a href="https://smartcities.gov.in/">
              <Image
                src="https://iudx-catalogue-assets.s3.ap-south-1.amazonaws.com/smart-city.png"
                iconSize="5.2rem"
              />
            </a>
            <a href="http://mohua.gov.in/">
              <Image
                src="https://iudx-catalogue-assets.s3.ap-south-1.amazonaws.com/mohua.png"
                iconSize="20.8rem"
              />
            </a>
            <a href="https://www.iisc.ac.in/">
              <Image
                src="https://iudx-catalogue-assets.s3.ap-south-1.amazonaws.com/iisc.png"
                iconSize="5.8rem"
              />
            </a>
          </FlexDiv>
        </Div>
      </FlexDiv>
    </footer>
  );
}

Footer.propTypes = {};

Footer.defaultProps = {};

/* <footer>
<div classNameName="container">
  <div className="col-1">
    <a href="#/">
      <img
        src="https://iudx-catalogue-assets.s3.ap-south-1.amazonaws.com/iudx.png"
        className="logo"
        alt='LOGO'
      />
    </a>
    <div className="place">
      <a href="https://goo.gl/maps/MyKzgG2gzK1JsENz7" >
        <img
          src="/assets/location.png"
          alt='LOGO'
          />
        <span>
          Indian Institute of Science, Entrepreneurship Centre, Ground
          Floor, Bengaluru, Karnataka 560012
        </span>
      </a>
    </div>
  </div>

  <div className="col-3">
    <div className="flex-parent">
      <a href="https://smartcities.gov.in/">
        <img
             alt='LOGO'
             className="iudx-logo"
          src="https://iudx-catalogue-assets.s3.ap-south-1.amazonaws.com/smart-city.png"
        />
      </a>
      <a href="http://mohua.gov.in/">
        <img
          className="ministry-logo"
          alt='LOGO'
          src="https://iudx-catalogue-assets.s3.ap-south-1.amazonaws.com/mohua.png"
        />
      </a>
      <a href="https://www.iisc.ac.in/">
        <img
          className="iisc-logo"
          alt='LOGO'
          src="https://iudx-catalogue-assets.s3.ap-south-1.amazonaws.com/iisc.png"
        />
      </a>
    </div>
  </div>
</div>
</footer> */
