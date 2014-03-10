require 'spec_helper'

describe NoCms::Admin do

  context "when visiting dashboard" do
    before do
      visit no_cms_admin.root_path
    end

    subject { page }

    it("should show root modules") {
      expect(subject).to have_selector('#interface #col-1 .content', text: I18n.t('no_cms.admin.menu_items.pages'))
      expect(subject).to have_selector('#interface #col-1 .content', text: I18n.t('no_cms.admin.menu_items.blog'))
    }

    it("should show nested modules") {
      expect(subject).to have_selector('#interface #col-1 .content ul ul li', text: I18n.t('no_cms.admin.menu_items.posts'))
      expect(subject).to have_selector('#interface #col-1 .content ul ul ul li', text: I18n.t('no_cms.admin.menu_items.drafts'))
    }

  end

end
