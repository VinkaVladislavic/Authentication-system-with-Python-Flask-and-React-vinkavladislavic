"""empty message

Revision ID: 5440b72b147c
Revises: 51f357bb0e8b
Create Date: 2025-01-24 23:54:34.593058

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5440b72b147c'
down_revision = '51f357bb0e8b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('token_blocked_list',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('jti', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('jti')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('token_blocked_list')
    # ### end Alembic commands ###
