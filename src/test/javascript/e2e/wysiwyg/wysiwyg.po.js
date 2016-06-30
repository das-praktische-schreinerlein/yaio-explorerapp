/**
 * defines elements of the wysiwyg-editor of YAIO
 */
'use strict';

var YAIOWysiwygPage = function() {
    var me = this;

    me.editorInput = '#ymf-wysiwyg-editor';
    me.editorPreview = '#ymf-wysiwyg-preview';
    me.inputAceElm = '#ymf-wysiwyg-editor > textarea.ace_text-input';
    
    /**
     * add markdown to wysiwyg-editor, wait till rendered and compare with expected result
     * @param   {String} markdownText    text to render
     * @param   {String} expected        expected result after rendering
     * @returns {JQueryPromise}                promise
     */
    me.checkWysiwygContent = function (markdownText, expected) {
        var editorInput = $(me.editorInput);

        // prepare
        protractor.utils.waitUntilElementPresent(editorInput, protractor.utils.CONST_WAIT_ELEMENT);
        return browser.actions().doubleClick(editorInput).perform()
            .then(function sendData() {
                // send markdown
                var inputAceElm = $(me.inputAceElm);
                protractor.utils.waitUntilElementPresent(inputAceElm, protractor.utils.CONST_WAIT_ELEMENT);
                return inputAceElm.sendKeys(markdownText);
            })
            .then(function checkContent() {
                // sleep because markdown is only rendered every 5 seconds
                browser.sleep(5000);
                
                // check preview
                var editorPreview = $(me.editorPreview);
                expect(editorPreview.getInnerHtml()).toContain(expected.trim());
                return editorPreview.getInnerHtml();
            });
    };
};
module.exports = YAIOWysiwygPage;
