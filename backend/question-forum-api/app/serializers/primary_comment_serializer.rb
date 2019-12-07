class PrimaryCommentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :user_id, :comment, :created_at, :updated_at
  belongs_to :user
  has_many :secondary_comments 
end