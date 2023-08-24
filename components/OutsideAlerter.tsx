'use client'

import { changeShowStatus } from "@/redux/shop";
import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

function useOutsideAlerter(ref, clickedEleClass) {

  const dispatch = useDispatch()
  console.log('clickedEleClass', clickedEleClass)

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        console.log('----------')
        console.log(event.target.className)
        console.log(clickedEleClass)
        console.log('----------')
        // if(!event.target.className.startsWith(clickedEleClass)) {
        console.log('ELLELEEL', document.querySelector('.shop-info-wrapper').style['background-color'])
        document.querySelector('.shop-info-wrapper').style['transform'] = 'translateY(1000px)'
        document.querySelector('.shop-info-wrapper').style['animation'] = '0.4s linear 0s 1 running dissapear'
        document.querySelector('.darknerer').style['background-color'] = 'rgba(0, 0, 0, 0)'
        document.querySelector('.darknerer').style['animation'] = '0.4s linear 0s 1 running get-lighter'
        setTimeout(() => {
          dispatch(changeShowStatus(false))
        }, 400)
        // }
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideAlerter(props) {
  console.log('11111111111', props.clickedEleClass)
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.clickedEleClass);

  return <div className="shop-info-wrapper" ref={wrapperRef}>{props.children}</div>;
}
