class SecondaryCommentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :primary_comment_id, :user_id, :comment, :created_at, :updated_at
  	belongs_to :user
    belongs_to :primary_comment
end
