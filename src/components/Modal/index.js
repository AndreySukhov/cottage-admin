import React from 'react'
import ReactAriaModal from 'react-aria-modal'
import cc from 'classcat'
import PropTypes from 'prop-types'

import './style.css'

const Modal = ({ children, contentClassName, className, isOpen, onCloseClick, overlayClassName, title, ariaTitle, shouldCloseOnOverlayClick, verticallyCenter, closeBtn, wide, xl, withPadding, fill, subtitle, ...props }) => {
  return (
    <ReactAriaModal
      getApplicationNode={() => document.getElementById('root')}
      dialogClass={cc(['modal', className, {
        'modal--with-padding': !!withPadding,
        'modal--wide': !!wide,
        'modal--xl': !!xl
      }])}
      underlayClass={cc(['modal-bg', overlayClassName])}
      underlayClickExits={shouldCloseOnOverlayClick}
      mounted={isOpen}
      ariaTitle={ariaTitle}
      titleText={ariaTitle}
      onExit={onCloseClick}
      verticallyCenter={verticallyCenter}
      {...props}>
      <div tabIndex={0} style={{ outline: 'none' }}>
        {children}
      </div>
    </ReactAriaModal>
  )
}

Modal.defaultProps = {
  isOpen: false,
  shouldCloseOnOverlayClick: true,
  verticallyCenter: true,
  titleText: 'Модальное окно',
  ariaTitle: 'Модальное окно',
  onCloseClick: () => {}
}

Modal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  isOpen: PropTypes.bool,
  onCloseClick: PropTypes.func,
  overlayClassName: PropTypes.string,
  shouldCloseOnOverlayClick: PropTypes.bool,
  verticallyCenter: PropTypes.bool,
  ariaTitle: PropTypes.string,
  wide: PropTypes.bool,
}

export default Modal
