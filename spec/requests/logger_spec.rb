require 'spec_helper'

describe NoCms::Admin::Logger do

  context "when actions log for now" do

    before do
      visit new_lorem_ipsum_path
    end

    subject { page }

    it("should show message in info area") {
      expect(subject).to have_selector('.content .msg.info', text: 'info message now')
    }

  end

  context "when actions log for later" do

    before do
      visit new_lorem_ipsum_path later: 1
    end

    subject { page }

    it("should show message in info area") {
      expect(subject).to have_selector('.content .msg.info', text: 'info message later')
    }

  end

  context "console log", js: true do

    before do
      visit new_lorem_ipsum_path
    end

    subject { page }

    it("should show message in console") {
      expect(subject).to have_selector('#log-bar .msg.info', text: 'info message now')
    }

  end


end
