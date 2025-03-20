import { useCallback, useEffect } from "react";

// Utility functions
const domContains = (context, node) => {
  if (!context || !node) return false;

  if (context.contains) {
    return context.contains(node);
  } else if (context.compareDocumentPosition) {
    return context === node || !!(context.compareDocumentPosition(node) & 16);
  }

  if (node) {
    do {
      if (node === context) {
        return true;
      }
    } while ((node = node.parentNode));
  }
  return false;
};

const getRefTarget = (ref) => {
  return ref && ("current" in ref ? ref.current : ref);
};

function getDOMNode(elementOrRef) {
  if (!elementOrRef) return null;

  // Handle refs
  const element = getRefTarget(elementOrRef);

  if (!element) return null;

  // Handle DOM nodes
  if (element.nodeType && typeof element.nodeName === "string") {
    return element;
  }

  // Handle custom properties that might contain the DOM node
  if (element.root) return element.root;
  if (element.child) return element.child;

  return null;
}

function isLeftClickEvent(e) {
  return e?.button === 0;
}

function isModifiedEvent(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e?.shiftKey);
}

function onEventListener(target, eventType, listener, options = false) {
  target.addEventListener(eventType, listener, options);

  return {
    off() {
      target.removeEventListener(eventType, listener, options);
    },
  };
}

function useRootClose(
  onRootClose,
  {
    disabled,
    triggerTarget,
    overlayTarget,
    listenEscape = false,
    isPortal = false,
  }
) {
  const handleDocumentMouseDown = useCallback(
    (event) => {
      const triggerElement = getDOMNode(triggerTarget);
      const overlayElement = getDOMNode(overlayTarget);

      if (triggerElement && domContains(triggerElement, event.target)) {
        return;
      }

      if (overlayElement && domContains(overlayElement, event.target)) {
        return;
      }

      if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
        return;
      }

      onRootClose?.(event);
    },
    [onRootClose, triggerTarget, overlayTarget]
  );

  const handleEscapeKey = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onRootClose?.(event);
      }
    },
    [onRootClose]
  );

  useEffect(() => {
    const currentTarget = getDOMNode(triggerTarget);

    if (disabled || !currentTarget) return;

    const doc = () =>
      (currentTarget && currentTarget.ownerDocument) || document;

    const onDocumentMouseDownListener = onEventListener(
      doc(),
      "mousedown",
      handleDocumentMouseDown,
      true
    );

    let onDocumentKeyUpListener;
    if (listenEscape) {
      onDocumentKeyUpListener = onEventListener(
        doc(),
        "keyup",
        handleEscapeKey,
        true
      );
    }

    return () => {
      onDocumentMouseDownListener?.off();
      onDocumentKeyUpListener?.off();
    };
  }, [
    triggerTarget,
    disabled,
    onRootClose,
    handleDocumentMouseDown,
    handleEscapeKey,
    listenEscape,
  ]);
}

export default useRootClose;
