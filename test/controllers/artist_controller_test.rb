require 'test_helper'

class ArtistControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get artist_show_url
    assert_response :success
  end

end
